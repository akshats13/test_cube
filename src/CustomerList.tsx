import React, { useState, useEffect } from 'react';
import CustomerCard from './CustomerCard';
import CustomerDetails from './CustomerDetails';
import { Customer } from './type';
import Loading from 'react-loading';
import Pagination from 'react-js-pagination';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('https://randomuser.me/api/?results=1000');
      const data = await response.json();
      const customers = data.results.map((user: any) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        title: user.name.title,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`,
      }));
      setCustomers(customers);
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return (
      <div>
        <Loading type="spinningBubbles" color="#000" />
      </div>
    );
  }

  return (
    <div className="customer-list-container">
      <div className="customer-list">
        <h2>Select Customer</h2>
        {currentItems.map((customer: Customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            isSelected={selectedCustomer === customer}
            onSelect={() => setSelectedCustomer(customer)}
          />
        ))}
        <Pagination
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={customers.length}
          onChange={handlePageChange}
          activePage={currentPage}
        />
      </div>
      <div className="customer-details">
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </div>
    </div>
  );
};

export default CustomerList;
