import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Welcome to Bun's Vehicle Data!</h1>
      <div className='cards_container'>
        <div className='cards_wrapper'>
          <ul className='cards_items'>
            <CardItem
              src='images/img-9.jpg'
              text='Check out all The vehicle here.'
              label='Adventure'
              path='/alldata'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Are you ready for your next vehicle purchase?'
              label='Buying'
              path='/'
            />
          </ul>
          <ul className='cards_items'>
            <CardItem
              src='images/img-3.jpg'
              text='Performance data'
              label='Adrenaline'
              path='/performance-data'
            />
            <CardItem
              src='images/img-4.jpg'
              text='More vehicle data.'
              label='Tech'
              path='/alldata'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;