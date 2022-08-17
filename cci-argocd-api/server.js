const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());

const cciEndpoint = process.env.CCI_ENDPOINT // https://circleci.com/docs/api/v2/index.html#operation/listPipelinesForProject  
const argoEndpoint = process.env.ARGO_ENDPOINT // https://argocd.circleci-demo-app.com/swagger-ui#operation/ApplicationService_Get
const circleConfig = {
    headers: {
        'Circle-Token': process.env.CIRCLE_TOKEN // personal API token
    },
    qs: {
        branch: 'main'
    }
};
const agent = new https.Agent({  
    rejectUnauthorized: false
  });

const argoConfig = {
    httpsAgent: agent,
    headers: {
        'Authorization': `Bearer ${process.env.ARGO_TOKEN}`
    }}


const getCircleCI = async (req, res) => {
    let circle = await circleQuery();
    res.send(circle.data.items)
}

const getArgoCD = async (req, res) => {
    let argo = await argoQuery();
    res.send(argo.data.status.history)
}

let circleQuery = async () => {
    let response = await axios(cciEndpoint, circleConfig);
    return response;
};

let argoQuery = async () => {
    let response = await axios(argoEndpoint, argoConfig);
    return response;
};

app.get('/circleci', getCircleCI)
app.get('/argocd', getArgoCD)

app.listen(3000, () => {
    console.log('app is running on port 3000');
})