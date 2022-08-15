import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './deployment-card.css';

const DeploymentCard = ({ date, action, revision, target }) => {
    return (
        <Card className='deployment-card'>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {target}
          </Typography>
          <Typography variant="p" component="div">
            {revision} was {action} at {date}
          </Typography>

        </CardContent>
      </Card>
    )
}

export default DeploymentCard;