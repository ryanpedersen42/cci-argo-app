# CCI <> ArgoCD App

App that lets you check status of ArgoCD instance against CircleCI commits.

`cci-argocd` contains the frontend, which should run on `localhost:3001`, and points to the backend, which runs on `localhost:3001`

Need to supply CircleCI and ArgoCD API tokens in the `.env` file. You can find a template for that under `cci-argocd-api/.env.template` and rename it `.env`.

