"use client";

import { useState } from 'react';
import Link from 'next/link';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const calculatedBMI = (weight / (height * height)).toFixed(2);
      setBmi(calculatedBMI);
      setCategory(getBMICategory(calculatedBMI));
    } else {
      alert("Please enter both weight and height.");
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    else if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    else return 'Obese';
  };


  return (
    <div>
    <nav className="navbar">
        <Link href="https://github.com/KhawajaAbdulMoiz">
          <img src='/github.png' alt='github'  height={40} width={40}/>
        </Link>
        <Link href="https://www.linkedin.com/in/khawaja-abdul-moiz">
          <img src='/linkedin.png' alt='linkedin' height={40} width={40}/>
        </Link>
      </nav>
      <form onSubmit={calculateBMI}>
       
        <label htmlFor="weight">Enter your weight (in kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 70"
          required
        />

        <label  htmlFor="height">Enter your height (in meters):</label>
        <input className= "hgt"
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          step="0.01"
          placeholder="e.g., 1.75"
          required
          
        />

        <button type="submit">Calculate BMI</button>
      </form>

      {bmi && (
        <div>
          <h2>Your BMI is: {bmi}</h2>
          <h2>You are {category}</h2>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
