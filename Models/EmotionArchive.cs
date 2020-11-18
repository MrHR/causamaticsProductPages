using Piranha.AttributeBuilder;
using Piranha.Extend;
using Piranha.Extend.Fields;
using Piranha.Models;

namespace causamaticsProductPages.Models
{
    [PageType(Title = "Emotion Page", UseBlocks = false, UseExcerpt = false, UsePrimaryImage = false)] // Disable blocks, Excerpt and Primary image to fix formatting for page 
    [PageTypeRoute(Title = "Default", Route = "/emotion")]
    public class EmotionArchive  : Page<EmotionArchive>
    {
        public class EmotionRegion
        {
            [Field(Placeholder = "Benaming emotie")]
            public TextField EmotionPretty { get; set; }
            [Field(Placeholder = "De geanimeerde afbeelding")]
            public ImageField Afbeelding { get; set; }
            [Field(Placeholder = "De achtergrond kleur")]
            public ImageField ColorTone { get; set; }
            [Field]
            public TextField Quote { get; set; }
            [Field]
            public AudioField Audio { get; set; }
            [Field(Placeholder = "CSS code voor achtergrond gradient.")]
            public TextField Gradient { get; set; }
        }

        [Region]
        public EmotionRegion Emotion { get; set; }
    }
}