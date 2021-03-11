let materials = {
    "Heart symbol": {
        text: "Compassion, love and understanding",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png",
    },
    "White Feather symbol": {
        text: "Trust, honour, strength, wisdom, freedom, courage and power. A message of support from the Angelic Spirit Realm and from departed loved ones",
        image: "https://st.depositphotos.com/1820970/1551/i/600/depositphotos_15516679-stock-photo-white-feather.jpg",
    },
    "Amethyst": {
        text: "Spiritual awarenes, clearing, meditation, balances mind, body and spirit, pain relief and healing",
        image: "https://static.scientificamerican.com/blogs/cache/file/3ADA2E33-3CC5-4E58-A4D5C2E19D2F4A6C.jpg",
    },
    "Lapis Lazuli": {
        text: "Wisdom, spirituality, awareness, psychic development, self expression and clarity",
        image: "https://mineralesdelmundo.com/wp-content/uploads/2018/07/lapislazuli-500x500.jpg",
    },
    "Green Aventurine": {
        text: "Leadership, properity, self-confidence, balance. Releases blocks to moving forward. Attracts love and healing",
        image: "https://thumbs.dreamstime.com/b/tumbled-green-aventurine-gem-stone-isolated-closeup-sample-natural-mineral-geological-collection-white-background-170795077.jpg",
    },
    "Lava Stone": {
        text: "Grounding, connection to the earth, courage, strength, calms and dissipates anger",
        image: "https://cdn.shopify.com/s/files/1/0519/7573/files/Lava-Stone-Clear_196104d4-99d6-4255-a155-333a74b840fc_240x240.png?v=1568916505",
    },
    "Dragon Vein Agate": {
        text:  "Bringing forward hidden talents, ability to manifest, heightens creativity, energy, strength and finding true love",
        image: "https://cdn.shopify.com/s/files/1/0249/4529/5414/products/CustomPlugs-BlueDragonVeinStonePlugSingle_2000x.jpg?v=1597055642",
    },
    "Jade": {
        text: "Healing, heart purification, gentleness, balance, good luck, abundance and renewal",
        image: "https://www.annmariegianni.com/wp-content/uploads/2019/03/mar2019_newseltter_blog_jade-800x533.jpg",
    },
    "Wood": {
        text: "Wisdom, knowledge, grounding and connecting",
        image: "https://static.scientificamerican.com/sciam/cache/file/E00E5DC5-1F35-4256-9693D7CD448C302B_source.jpg",
    },
    "Goldstone": {
        text: "Abundance, clears negativity, revitality, strength and calmness",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Goldfluss_%28Aventuringlas%29.jpg",
    },
    "Garnet": {
        text: "Fire, cleanses and re-energises the chakras, purifies, balances energy, passion, love, trust and honesty",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Garnet_Andradite20.jpg",
    },
    "Tiger-Eye": {
        text: "Grounding, balance, integrity, self-confidence and releasing blocks",
        image: "https://cdn.shopify.com/s/files/1/0159/0942/1110/products/tigerseyestone-energymuse.png?v=1572007130",
    },
    "Flourite": {
        text: "Truth, conciousness, aura cleansing, protection, intuition and neutralises negativity",
        image: "https://i.pinimg.com/564x/a2/37/07/a23707f527f9118b919c5ccf0f47b9a8.jpg",
    },
    "Carnelian": {
        text: "Vitality, motivation, stimulates creativity, analytical abilities and improves perception",
        image: "https://www.gemsociety.org/wp-content/uploads/2013/12/770px-Bull_seal_AO7121-2.jpg",
    },
    "Rose Quartz": {
        text: "Love, joy, balance and grounding",
        image: "https://cdn.shopify.com/s/files/1/0273/4214/3566/files/Untitled_design_-_2020-06-30T133217.538.jpg?v=1593520346",
    },
    "Yellow Agate": {
        text: "Willpower, logic, memory, grounding, protection and harmony",
        image: "https://www.astrosage.com/images/yellow-sp.jpg",
    },
    "Green Agate": {
        text: "Luck, healing, love, prosperity, compassion, generosity, justice, mental and emotional flexibility",
        image: "https://www.gemstone7.com/image/gemstone/158-green-agate.png",
    },
    "Peach Agate": {
        text: "Self-acceptance, healing, transformation, balance, boosts creativity, grounding and spirituality",
        image: "https://cdn11.bigcommerce.com/s-v6pvhgcqyz/product_images/uploaded_images/apricot-agate-10.jpg",
    },
    "Hematite": {
        text: "Absorbs negativity, grounding, protection. Transforms the negative to the positive. Aids blood related issues",
        image: "https://cdn.shopify.com/s/files/1/0273/4214/3566/files/Untitled_design_-_2020-06-23T192619.204_1024x1024.jpg?v=1592936806",
    },
    "Amber": {
        text: "Teething pain, absorbs negative energy, protection, transmutes to healing, clarity, self-confidence, wisdom and expression",
        image: "https://meanings.crystalsandjewelry.com/wp-content/uploads/2019/03/Amber.jpg",
    },
    "Fuchsia Agate": {
        text: "Love, releases anger and negativity, self-confidence and positivity",
        image: "https://images-na.ssl-images-amazon.com/images/I/61uX9CVsjTL._AC_SX466_.jpg",
    },
    "Blue Jasper": {
        text: "Spirituality, communication, balances ying and yang energy. Aligns and balances energy centers",
        image: "https://i.pinimg.com/600x315/8d/da/70/8dda701ddd71a0688e9412e66dec4b21.jpg",
    },
    "Labradorite": {
        text: "Strengthens will, psychic development, imagination, calmness and transformation",
        image: "https://geology.com/gemstones/labradorite/blue-labradorite.jpg",
    },
    "Chrysoberyl Cats-Eye": {
        text: "Personal power, sppirituality, forgiveness and protection",
        image: "https://d2nqgo917py34o.cloudfront.net/wp-content/uploads/2008/02/26024003/cats-eye-1.jpg",
    },
    "Turquoise": {
        text: "Protective talisman, wisdom, love and intuition",
        image: "https://www.thespruce.com/thmb/Sulnzil1ViBcR76Mw3giy70QoIU=/1863x1147/filters:no_upscale():max_bytes(150000):strip_icc()/turquoise-meaning-purity-and-happiness-1274380-1-H-cc2a890cf5e1461797bf784d1bdcef1d.jpg",
    },
    "Black Colour": {
        text: "Protection, forgiveness, power, strength and authority",
        image: "https://blogs.sas.com/content/sastraining/files/2015/03/black_background.png",
    },
    "Blue Colour": {
        text: "Colour of healers, tranquility, trust, intuition communication and calmness",
        image: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/8/1/1375354802439/Blue---the-colour-008.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=d32b70ddf7ecff3771c2d99d32eae422",
    },
    "Red Colour": {
        text: "Energy, action, confidence, power and change",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png",
    },
    "Orange Colour": {
        text: "Motivation, personal power, sexuality and joy",
        image: "https://promotiontag.com/wp-content/uploads/2019/07/orange.jpg",
    },
    "Silver Grey Colour": {
        text: "Spirituality, wisdom, simplicity and calmness",
        image: "https://www.riolettcustomaerosols.co.uk/img/colours/webp/ral-7001-silver-grey.webp",
    },
    "Malachite": {
        text: "Abundance, manifesting, clears and activates all chakras. Eases menstrual cramps and childbirth. Amplifies energy, purifies and protects",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Malachite%2C_Zaire.jpg/1200px-Malachite%2C_Zaire.jpg",
    },
    "Crackled Agate": {
        text: "Courage, confidence, happiness, properity and spirituality",
        image: "http://www.4remedy.com/files/1385196286_AGATe%20CRACKLED%20FIRE%20AGAT.jpg",
    },
    "Prehnite": {
        text: "Unconditional love, heal the healer, intuition, alleviates nightmares and releases deep fears",
        image: "https://www.healingwithcrystals.net.au/uploads/1/5/5/7/15572098/prehnite-119487_orig.jpg",
    },
    "Orange Jasper": {
        text: "Happiness, uplifting, friendship and eases emotional stress",
        image: "https://i.etsystatic.com/6433225/d/il/0da437/2526079317/il_340x270.2526079317_bvny.jpg?version=0",
    },
    "Silver": {
        text: "Reflects back energy, balances power, wealth and spiritual energy",
        image: "https://www.silverinstitute.org/wp-content/uploads/2017/07/silver-report2020.jpg",
    },
    "Yellow Cat's Eye": {
        text: "Transforms negative though, happiness, optimism and generosity",
        image: "https://geology.com/gemstones/chatoyancy/cats-eye-beryl.jpg",
    },
    "Purple Rose": {
        text: "Royality, love and enchantment",
        image: "https://www.gia.edu/images/6279_636x358.jpg",
    },
    "Snowflake Obsidian": {
        text: "Balances body, mind and spirit and releases negative energy",
        image: "https://secure.sellr.com/images/5503733/4589UWS5503733XWSD1.jpg",
    },
    "White Howlite": {
        text: "Attunement, higher conciousness, reduces anxiety, tension and stress. Aids emotional expression",
        image: "https://mycrystalpedia.files.wordpress.com/2019/11/howlite2.jpg",
    },
    "Red Coral": {
        text: "Increases self-esteem, sea energy, success in business, leadership roles, strength, passion, changes and health",
        image: "https://images-na.ssl-images-amazon.com/images/I/21XhvmAxIwL.jpg",
    },
}
