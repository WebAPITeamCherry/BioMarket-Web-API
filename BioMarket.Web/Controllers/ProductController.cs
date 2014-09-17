namespace BioMarket.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    public class ProductController : ApiController
    {
        // GET: api/Product
        public IHttpActionResult Get()
        {
            return  Ok();
        }

        // GET: api/Product/5
        public IHttpActionResult Get(int id)
        {
            return Ok();
        }

        // POST: api/Product
        public IHttpActionResult Post([FromBody]string value)
        {
            return Ok(value);
        }

        // PUT: api/Product/5
        public IHttpActionResult Put(int id, [FromBody]string value)
        {
            return Ok();

        }

        // DELETE: api/Product/5
        public IHttpActionResult Delete(int id)
        {
            return Ok();
        }
    }
}
