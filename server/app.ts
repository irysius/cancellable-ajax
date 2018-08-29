import * as PATH from 'path';
import * as http from 'http';
import * as express from 'express';
import { AddressInfo } from 'net';


let app = express();
let viewPath = PATH.normalize(PATH.join(__dirname, '..', 'browser'));
app.use(express.static(PATH.join(viewPath)));
app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/long', (req, res) => {
    setTimeout(() => {
		res.json({ message: 'OK' });
	}, 30 * 1000);
});
app.get('/short', (req, res) => {
	res.json({ message: 'OK' });
});
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

let httpServer = http.createServer(app);
httpServer.on('listening', () => {
    let address = httpServer.address() as AddressInfo;
    console.log(`server is up and running at port: ${address.port}`);
});

httpServer.listen(1111);