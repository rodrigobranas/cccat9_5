import GetProduct from "./application/GetProduct";
import GetProducts from "./application/GetProducts";
import RestController from "./infra/controller/RestController";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const productData = new ProductDataDatabase(connection);
const getProduct = new GetProduct(productData);
const getProducts = new GetProducts(productData);
new RestController(httpServer, getProducts, getProduct);
httpServer.listen(3002);
