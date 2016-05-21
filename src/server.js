import express from 'express';
import bodyParser from 'body-parser';
import RoyalDocument from 'royalts';
const royalDocument = new RoyalDocument();

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 7000, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});

app.post('/api', (req, res) => {
  console.log(res.body);
  royalDocument.setRaw(req.body);
  try {
    res.set('Content-Type', 'text/xml');
    res.send(royalDocument.toString());
  } catch (e) {
    res.status(400);
    res.json({ error: e.message, entity: royalDocument.errorEntity });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname +  '/input.html');
});

// const stuff = {
// "Type": "RoyalDocument",
//   "Name": "Document Name",
//   "Children": [{
//   "Type": "RoyalFolder",
//   "Name": "production",
//   "Children": [{
//     "Type": "RoyalSSHConnection",
//     "Name": "coolserver",
//     "URI": "10.20.30.40"
//   }]
// }, {
//   "Type": "RoyalFolder",
//   "Name": "something",
//   "Children": [{
//     "Type": "RoyalFolder",
//     "Name": "inside something",
//     "Children": [{
//       "Type": "RoyalSSHConnection",
//       "Name": "coolserver2",
//       "URI": "10.20.30.47"
//     }]
//   }, {
//     "Type": "RoyalFolder",
//     "Name": "Secret stash"
//   }]
// }, {
//   "Type": "RoyalFolder",
//   "Name": "dev",
//   "Children": [{
//     "Type": "RoyalFolder",
//     "Name": "secret stuff",
//     "Children": [{
//       "Type": "RoyalSSHConnection",
//       "Name": "secretServer",
//       "URI": "10.20.30.47"
//     }]
//   }, {
//     "Type": "RoyalFolder",
//     "Name": "Just my test"
//   }]
// }]
