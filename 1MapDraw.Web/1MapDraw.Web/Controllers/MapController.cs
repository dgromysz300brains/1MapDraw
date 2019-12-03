using _1MapDraw.Web.BLL;
using _1MapDraw.Web.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace _1MapDraw.Web.Controllers
{
    [Route("api/[controller]")]

    public class MapController : Controller
    {
        private readonly IMapService mapService;

        public MapController(IMapService mapService)
        {
            this.mapService = mapService ?? throw new System.ArgumentNullException(nameof(mapService));
        }

        [HttpGet("[action]")]
        public IEnumerable<MapPath> Path()
        {
            return mapService.GetPaths();
        }

        [HttpPut("[action]")]
        public void Path([FromBody]MapPath path)
        {
            mapService.SavePath(path);
        }
    }
}