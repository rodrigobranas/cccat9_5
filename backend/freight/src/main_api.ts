import CalculateFreight from "./application/CalculateFreight";
import RestController from "./infra/controller/RestController";
import ZipcodeDataDatabase from "./infra/data/ZipcodeDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";

const connection = new PgPromiseConnection();
const httpServer = new ExpressHttpServer();
const zipcodeData = new ZipcodeDataDatabase(connection);
const calculateFreight = new CalculateFreight(zipcodeData);
new RestController(httpServer, calculateFreight);
httpServer.listen(3001);
