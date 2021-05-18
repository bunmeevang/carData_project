import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Welcome to Bun's Vehicle Data!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
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
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Performance data'
              label='Adrenaline'
              path='/products'
            />
            <CardItem
              src='images/img-4.jpg'
              text='More vehicle data.'
              label='Tech'
              path='/services'
            />
            <CardItem
              src='images/img-8.jpg'
              text="The best car collection"
              label='Adrenaline'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;