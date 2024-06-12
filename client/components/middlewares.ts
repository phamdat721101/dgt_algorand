import { chain } from "./middlewares/chain";
import { withMiddleware1 } from "./middlewares/middleware1";
import { withMiddleware2 } from "./middlewares/middleware2";

const middleware = [withMiddleware1,withMiddleware2]

export default chain(middleware)
