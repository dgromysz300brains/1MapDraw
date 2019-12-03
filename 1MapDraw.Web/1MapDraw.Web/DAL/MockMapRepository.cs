using _1MapDraw.Web.Model;
using System;
using System.Collections.Generic;

namespace _1MapDraw.Web.DAL
{
    public class MockMapRepository : IMapRepository
    {
        private static List<MapPath> paths = new List<MapPath>
        {
            new MapPath
            {
                Points = new List<MapPoint>
                {
                    new MapPoint { X = 57.700668M, Y = 11.96822M },
                    new MapPoint { X = 57.700668M, Y = 11.96821M },
                    new MapPoint { X = 57.700668M, Y = 11.96820M }
                }
            },
            new MapPath
            {
                Points = new List<MapPoint>
                {
                    new MapPoint { X = 57.700668M, Y = 11.96822M },
                    new MapPoint { X = 57.700668M, Y = 11.96741M }
                }
            },
            new MapPath
            {
                Points = new List<MapPoint>
                {
                    new MapPoint { X = 57.700668M, Y = 11.96822M },
                    new MapPoint { X = 57.700755M, Y = 11.96821M }
                }
            }
        };

        public List<MapPath> GetPaths()
        {
            return paths;
        }

        public void SavePath(MapPath path)
        {
            if (path == null)
            {
                throw new ArgumentNullException(nameof(path));
            }

            paths.Add(path);
        }
    }
}