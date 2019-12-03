using _1MapDraw.Web.Model;
using System.Collections.Generic;

namespace _1MapDraw.Web.BLL
{
    public interface IMapService
    {
        List<MapPath> GetPaths();

        void SavePath(MapPath path);
    }
}