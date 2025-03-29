document.addEventListener("DOMContentLoaded", function() {
    // Check if the animal data is in local storage
    let animals = localStorage.getItem("animals");

    if (!animals) {
        // If not, fetch it from the CSV file
        fetchAnimalsFromCSV();
    } else {
        // Parse the JSON string back into an array
        animals = JSON.parse(animals);
        displayRandomAnimal(animals);
    }
});

function fetchAnimalsFromCSV() {
    // CSV data (for demonstration; in practice, you'd load this from a file)
    const csvData = `
    Scientific name,Primary common name,Class,Order,Family,Federal protection,State protection
Acipenser brevirostrum,Shortnose Sturgeon,Actinopterygii (Ray-finned Fishes),"Acipenseriformes (Paddlefishes, Spoonfishes, and Sturgeons)",Acipenseridae (Sturgeons),Endangered,Endangered
Acipenser oxyrinchus,Atlantic Sturgeon,Actinopterygii (Ray-finned Fishes),"Acipenseriformes (Paddlefishes, Spoonfishes, and Sturgeons)",Acipenseridae (Sturgeons),Endangered,Endangered
Balaenoptera borealis,Sei Whale,Mammalia (Mammals),"Cetacea (Whales, Dolphins, and Porpoises)",Balaenopteridae,Endangered,Endangered
Balaenoptera musculus,Blue Whale,Mammalia (Mammals),"Cetacea (Whales, Dolphins, and Porpoises)",Balaenopteridae,Endangered,Endangered
Balaenoptera physalus,Fin Whale,Mammalia (Mammals),"Cetacea (Whales, Dolphins, and Porpoises)",Balaenopteridae,Endangered,Endangered
Calidris canutus,Red Knot,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)","Scolopacidae (Sandpipers, Snipes, and Relatives)",Threatened,Threatened
Caretta caretta,Loggerhead,Chelonia (Turtles),Testudines (Turtles),Cheloniidae,Threatened,Threatened
Charadrius melodus,Piping Plover,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)",Charadriidae (Lapwings and Plovers),"Endangered, Threatened",Endangered
Chelonia mydas,Green Turtle,Chelonia (Turtles),Testudines (Turtles),Cheloniidae,Threatened,Threatened
Dermochelys coriacea,Leatherback,Chelonia (Turtles),Testudines (Turtles),Dermochelyidae,Endangered,Endangered
Eubalaena glacialis,Northern Right Whale,Mammalia (Mammals),"Cetacea (Whales, Dolphins, and Porpoises)",Balaenidae,Endangered,Endangered
Glyptemys muhlenbergii,Bog Turtle,Chelonia (Turtles),Testudines (Turtles),Emydidae (Box Turtles and Pond Turtles),Threatened,Endangered
Laterallus jamaicensis,Black Rail,Aves (Birds),Gruiformes (Rails and Cranes),"Rallidae (Rails, Gallinnules, and Coots)",Threatened,Endangered
Megaptera novaeangliae,Humpback Whale,Mammalia (Mammals),"Cetacea (Whales, Dolphins, and Porpoises)",Balaenopteridae,Endangered,Endangered
Myotis septentrionalis,Northern Long-eared Bat,Mammalia (Mammals),Chiroptera (Bats),Vespertilionidae (Evening Bats and Vesper Bats),Endangered,Endangered
Myotis sodalis,Indiana Bat,Mammalia (Mammals),Chiroptera (Bats),Vespertilionidae (Evening Bats and Vesper Bats),Endangered,Endangered
Novisuccinea chittenangoensis,Chittenango Ovate Amber Snail,Gastropoda (Gastropods),Stylommatophora,Succineidae,Threatened,Endangered
Physeter macrocephalus,Sperm Whale,Mammalia (Mammals),"Cetacea (Whales, Dolphins, and Porpoises)",Physeteridae,Endangered,Endangered
Plebejus melissa samuelis,Karner Blue,Insecta (Insects),"Lepidoptera (Butterflies, Skippers, and Moths)","Lycaenidae (Blues, Coppers, Hairstreaks, Elfins)",Endangered,Endangered
Pleurobema clava,Clubshell,Bivalvia (Bivalves),Unionoida (Freshwater Mussels),Unionidae (Unionid Mussels),Endangered,Endangered
Sistrurus catenatus,Eastern Massasauga,Reptilia (Reptiles),"Squamata (Lizards, Snakes and Amphisbaenians)",Viperidae (Vipers and Pit Vipers),Threatened,Endangered
Sterna dougallii,Roseate Tern,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)","Laridae (Terns, Gulls and Relatives)",Endangered,Endangered
Villosa fabalis,Rayed Bean,Bivalvia (Bivalves),Unionoida (Freshwater Mussels),Unionidae (Unionid Mussels),Endangered,Endangered
Ardea alba,Great Egret,Aves (Birds),Pelecaniformes (Pelicans and Cormorants),"Ardeidae (Herons, Bitterns, and Egrets)",---,Protected Bird
Arenaria interpres,Ruddy Turnstone,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)","Scolopacidae (Sandpipers, Snipes, and Relatives)",---,Protected Bird
Asio otus,Long-eared Owl,Aves (Birds),Strigiformes (Owls),Strigidae (Typical Owls),---,Protected Bird
Calidris maritima,Purple Sandpiper,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)","Scolopacidae (Sandpipers, Snipes, and Relatives)",---,Protected Bird
Contopus cooperi,Olive-sided Flycatcher,Aves (Birds),Passeriformes (Perching Birds),Tyrannidae,---,Protected Bird
Dolichonyx oryzivorus,Bobolink,Aves (Birds),Passeriformes (Perching Birds),Icteridae,---,Protected Bird
Egretta caerulea,Little Blue Heron,Aves (Birds),Pelecaniformes (Pelicans and Cormorants),"Ardeidae (Herons, Bitterns, and Egrets)",---,Protected Bird
Egretta thula,Snowy Egret,Aves (Birds),Pelecaniformes (Pelicans and Cormorants),"Ardeidae (Herons, Bitterns, and Egrets)",---,Protected Bird
Euphagus carolinus,Rusty Blackbird,Aves (Birds),Passeriformes (Perching Birds),Icteridae,---,Protected Bird
Falco sparverius,American Kestrel,Aves (Birds),Falconiformes (Raptors),Falconidae (Caracaras and Falcons),---,Protected Bird
Haematopus palliatus,American Oystercatcher,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)",Haematopodidae,---,Protected Bird
Hylocichla mustelina,Wood Thrush,Aves (Birds),Passeriformes (Perching Birds),Turdidae (Thrushes),---,Protected Bird
Leucophaeus atricilla,Laughing Gull,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)","Laridae (Terns, Gulls and Relatives)",---,Protected Bird
Numenius phaeopus,Whimbrel,Aves (Birds),"Charadriiformes (Gulls, Plovers, and Shorebirds)","Scolopacidae (Sandpipers, Snipes, and Relatives)",---,Protected Bird
Piranga olivacea,Scarlet Tanager,Aves (Birds),Passeriformes (Perching Birds),"Cardinalidae (Cardinal-Grosbeaks, Cardinals, Grosbeaks, Saltators)",---,Protected Bird
Plegadis falcinellus,Glossy Ibis,Aves (Birds),Pelecaniformes (Pelicans and Cormorants),Threskiornithidae (Ibises and Spoonbills),---,Protected Bird
Setophaga discolor,Prairie Warbler,Aves (Birds),Passeriformes (Perching Birds),Parulidae (Wood-Warblers),---,Protected Bird
Tyto alba,Barn Owl,Aves (Birds),Strigiformes (Owls),Tytonidae ( Barn Owls),---,Protected Bird

    `;
    
    const rows = csvData.trim().split('\n').slice(1);
    const animals = rows.map(row => {
        const cols = row.split(',');
        return {
            scientificName: cols[0].trim(),
            commonName: cols[1].trim(),
            class: cols[2].trim(),
            order: cols[3].trim(),
            family: cols[4].trim(),
            federalProtection: cols[5].trim(),
            stateProtection: cols[6].trim(),
        };
    });

    // Store the animals in local storage
    localStorage.setItem("animals", JSON.stringify(animals));
    displayRandomAnimal(animals);
}

function displayRandomAnimal(animals) {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const randomAnimal = animals[randomIndex];

    // Update the HTML with the random animal's name and image
    document.getElementById("animalName").innerText = randomAnimal.commonName;
    const imageName = randomAnimal.commonName.replaceAll(" ", "") + ".png";  // Assuming images follow this naming convention
    const animalImage = document.getElementById("animalImage");
    animalImage.src = `assets/img/animals/${imageName}`;
    animalImage.style.display = 'block';  // Show the image
}
