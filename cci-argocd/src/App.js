import { useState, useEffect } from 'react';
import { differenceInMilliseconds, parseISO, intervalToDuration } from 'date-fns'
import Button from '@mui/material/Button';

import DeploymentCard from './components/deplyment-card';
import './App.css';

const axios = require('axios').default;

function App() {
  const [circleDate, setCircleDate] = useState('2022-08-12T15:58:38.249Z') // seed with dummy date
  const [circleRevision, setCircleRevision] = useState('')
  const [argoRevision, setArgoRevision] = useState('')
  const [argoDate, setArgoDate] = useState('2022-08-12T15:55:42Z') // seed with dummy date
  const [indexDifference, setIndexDifference] = useState()
  const [slug, setSlug] = useState()

  useEffect(() => {
    apiCalls()
  }, [indexDifference]); 
  
  // update URLs if deployed
  const circleCIEndpoint = "http://localhost:3000/circleci"
  const argoEndpoint = "http://localhost:3000/argocd"
  // 

  // date helpers
  const difference = differenceInMilliseconds(parseISO(circleDate), parseISO(argoDate))
  const split = intervalToDuration({ start: 0, end: difference })
  //

  // API calls
  const apiCalls = async () => {
    await argoAPICall()
    await circleAPICall()
  }

  const circleAPICall = async () => {
    try {
      const response = await axios.get(circleCIEndpoint);

      const index = response.data.map(value => value.vcs.revision).indexOf(argoRevision)
      await setCircleRevision(response.data[0].vcs.revision)
      await setCircleDate(response.data[0].created_at)
      await setIndexDifference(index)
      await setSlug(response.data[0].project_slug)
    } catch (error) {
      console.error(error);
    }
  }

  const argoAPICall = async () => {
    try {
      const response = await axios.get(argoEndpoint);
      const reversed = response.data.reverse();
      // console.log('resp', reversed[0].revision);
      setArgoRevision(reversed[0].revision)
      setArgoDate(reversed[0].deployedAt)

    } catch (error) {
      console.error(error);
    }
  }
  //

  // baseline metrics
  const idealCommits = 3 // hard coded 
  const idealTimeSplit = 86400000 // hard coded for now
  //

  return (
    <div className="App">
      <header className='header'>
        <p>CircleCI and ArgoCD</p>
      </header>
        <p>Time difference of <span className={difference < idealTimeSplit ? 'text-background-good' : 'text-background-bad'}>{split.days} days, {split.hours} hours, and {split.minutes} minutes </span>between most recent successful deployment and most recent commit to main</p>
        <p>That's <span className={indexDifference < idealCommits ? 'text-background-good' : 'text-background-bad'}>{indexDifference} commits to main</span></p>
        <Button>
          <a href={`https://app.circleci.com/pipelines/${slug}`}>Go to pipelines</a>
        </Button>
      <div className='container'>
        <div className='card'>
          <DeploymentCard
            target={'CircleCI'}
            date={circleDate}
            action={'committed'}
            revision={circleRevision}
          />
        </div>
        <div className='card'>
          <DeploymentCard
            target={'ArgoCD'}
            action={'deployed'}
            date={argoDate}
            revision={argoRevision}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
