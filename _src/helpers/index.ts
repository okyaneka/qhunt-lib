import bonus from "./bonus";
import common from "./common";
import db from "./db";
import model from "./model";
import qrcode from "./qrcode";
import response from "./response";
import schema from "./schema";
import service from "./service";

export { bonus, common, db, model, qrcode, response, schema, service };

const helpers = {
  bonus,
  common,
  db,
  model,
  qrcode,
  response,
  schema,
  service,
} as const;

export default helpers;
