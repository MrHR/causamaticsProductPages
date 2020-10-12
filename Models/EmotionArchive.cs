using Piranha.AttributeBuilder;
using Piranha.Extend;
using Piranha.Extend.Fields;
using Piranha.Models;

namespace causamaticsProductPages.Models
{
    [PageType(Title = "Emotion Page")]
    [PageTypeRoute(Title = "Default", Route = "/emotion")]
    public class EmotionArchive  : Page<EmotionArchive>
    {
        // public class EmotionRegion
        // {
        //     [Field]
        //     public ImageField Image { get; set; }
        //     [Field]
        //     public TextField Body { get; set; }
        // }

        // [Region]
        // public EmotionRegion Emotion { get; set; }
    }
}