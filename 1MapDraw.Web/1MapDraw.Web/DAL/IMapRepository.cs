using _1MapDraw.Web.Model;
using System.Collections.Generic;

namespace _1MapDraw.Web.DAL
{
    public interface IMapRepository
    {
        List<MapPath> GetPaths();

        void SavePath(MapPath path);
    }
}