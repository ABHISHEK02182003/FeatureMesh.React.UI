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
        const response = await fetch('http://featuremeshapis.azurewebsites.net/api/v1/landingpage');
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
  const scientists_count = data && data["scientists"];
  const feature_sets_count = data && data["featureSets"];

  return (
    <div className={classes.cTA}>
      <div className={classes.rectangle29}></div>
      <div className={classes.mockup}></div>
      <div className={classes.numbersAreTellingOurStory}>Numbers are telling our story</div>
      <div className={classes.bG}></div>
      <div className={classes.line3}></div>
      <div className={classes.line4}></div>
      <div className={classes._2M}>{JSON.stringify(rows_count, null, 2)}</div>
      <div className={classes.ticketsDeliveredThisMonth}>Rows of Entries</div>
      <div className={classes._46K}>{JSON.stringify(scientists_count, null, 2)}</div>
      <div className={classes.activeCustomersRate}>Data Scientists on our platform</div>
      <div className={classes._99}>{JSON.stringify(feature_sets_count, null, 2)}</div>
      <div className={classes.customerSatisfactionRate}>Feature Sets</div>
    </div>
  );
}

export default Analytics;
