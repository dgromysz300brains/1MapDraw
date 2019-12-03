using _1MapDraw.Web.DAL;
using _1MapDraw.Web.Model;
using System;
using System.Collections.Generic;

namespace _1MapDraw.Web.BLL
{
    public class MapService : IMapService
    {
        private readonly IMapRepository mapRepository;

        public MapService(IMapRepository mapRepository)
        {
            this.mapRepository = mapRepository ?? throw new ArgumentNullException(nameof(mapRepository));
        }

        public List<MapPath> GetPaths()
        {
            return mapRepository.GetPaths();
        }

        public void SavePath(MapPath path)
        {
            mapRepository.SavePath(path);
        }
    }
}