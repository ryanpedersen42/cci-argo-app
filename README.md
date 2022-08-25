# CCI <> ArgoCD App

App that lets you check status of ArgoCD instance against CircleCI commits.

`cci-argocd` contains the frontend, which should run on `localhost:3001`, and points to the backend, which runs on `localhost:3001`

Need to supply CircleCI and ArgoCD API tokens in the `.env` file. You can find a template for that under `cci-argocd-api/.env.template` and rename it `.env`.

## Prerequisites

* A Kubernetes Cluster
* Argo CD - https://argo-cd.readthedocs.io/en/stable/
* Argo Rollouts - https://argoproj.github.io/argo-rollouts/

## Architecture
The ArgoCD controller monitoring this application (cci-argo-app) is deployed in the ``db-cluster-cci`` running in ``eu-west-1`` under the the ``argocd`` namespace.


Currently this application (cci-argo-app) is deployed in the ``db-cluster-cci`` running in ``eu-west-1`` under the the ``cci-demo-app`` namespace.

### Running ArgoCD UI

The UI is running in the namespace mentioned above and is accessible through the External-IP of the service ``argocd-server``.

In order to log in to the UI you need to output the password to the CLI. This can be done by following the ArgoCD documentation - https://argo-cd.readthedocs.io/en/stable/getting_started/.

Once you have the above password you can login to the UI with the username ``admin`` and the password.



### Running this application
`cci-argocd` contains the frontend, which should run on `localhost:3001`

The above points to the backend, ``cci-argocd-api``, which runs on `localhost:3000`
