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
                    new MapPoint { X = 250, Y = 250 },
                    new MapPoint { X = 250, Y = 270 },
                    new MapPoint { X = 270, Y = 270 }
                }
            },
            new MapPath
            {
                Points = new List<MapPoint>
                {
                    new MapPoint { X = 250, Y = 250 },
                    new MapPoint { X = 270, Y = 250 }
                }
            },
            new MapPath
            {
                Points = new List<MapPoint>
                {
                    new MapPoint { X = 250, Y = 250 },
                    new MapPoint { X = 250, Y = 270 }
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