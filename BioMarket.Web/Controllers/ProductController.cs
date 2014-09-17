<<<<<<< HEAD
﻿namespace BioMarket.Web.Controllers
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
=======
﻿namespace BioMarket.Web.Controllers
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
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Product/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Product
        public IHttpActionResult Post([FromBody]string value)
        {
            return Ok(value);
        }

        // PUT: api/Product/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Product/5
        public void Delete(int id)
        {
        }
    }
}
>>>>>>> 5ec276da64c6e28b193769730586870d8be58a0a
