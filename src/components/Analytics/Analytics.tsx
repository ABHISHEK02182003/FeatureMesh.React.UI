import React, { useState, useEffect } from 'react';
import classes from './Analytics.module.css';

const Analytics: React.FC = () => {
  const [data, setData] = useState(null);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  //eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://featuremesharch.azurewebsites.net/landingpage');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const rows_count = data && data["entries"];
  let formatted_rows_count = "0";
  if (rows_count) {
    let number = Number(rows_count);
    if (number >= 1e9) {
      formatted_rows_count = (number / 1e9).toFixed(2) + ' billion';
    } else if (number >= 1e6) {
      formatted_rows_count = (number / 1e6).toFixed(2) + ' million';
    } else if (number >= 1e3) {
      formatted_rows_count = (number / 1e3).toFixed(1) + 'k';
    } else {
      formatted_rows_count = number.toLocaleString();
    }
  }

  const scientists_count = data && data["scientists"];
  let formatted_scientists_count = "0";
  if (scientists_count) {
    let number = Number(scientists_count);
    if (number >= 1e9) {
      formatted_scientists_count = (number / 1e9).toFixed(2) + ' billion';
    } else if (number >= 1e6) {
      formatted_scientists_count = (number / 1e6).toFixed(2) + ' million';
    } else if (number >= 1e3) {
      formatted_scientists_count = (number / 1e3).toFixed(1) + 'k';
    } else {
      formatted_scientists_count = number.toLocaleString();
    }
  }

  const feature_sets_count = data && data["featureSets"];
  let formatted_entity_count = "0";
  if (feature_sets_count) {
    let number = Number(feature_sets_count);
    if (number >= 1e9) {
      formatted_entity_count = (number / 1e9).toFixed(2) + ' billion';
    } else if (number >= 1e6) {
      formatted_entity_count = (number / 1e6).toFixed(2) + ' million';
    } else if (number >= 1e3) {
      formatted_entity_count = (number / 1e3).toFixed(1) + 'k';
    } else {
      formatted_entity_count = number.toLocaleString();
    }
  }

  return (
    <div className={classes.cTA}>
      <div className={classes.rectangle29}></div>
      <div className={classes.mockup}></div>
      <div className={classes.numbersAreTellingOurStory}>Numbers are telling our story</div>
      <div className={classes.bG}></div>
      <div className={classes.line3}></div>
      <div className={classes.line4}></div>
      <div className={classes._2M}>{formatted_rows_count}</div>
      <div className={classes.ticketsDeliveredThisMonth}>Rows of Entries</div>
      <div className={classes._46K}>{formatted_scientists_count}</div>
      <div className={classes.activeCustomersRate}>Data Scientists on our platform</div>
      <div className={classes._99}>{formatted_entity_count}</div>
      <div className={classes.customerSatisfactionRate}>Feature Sets</div>
    </div>
  );
}

export default Analytics;
