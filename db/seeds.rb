puts "destroying previous data"
Interaction.destroy_all
Profile.destroy_all
User.destroy_all

puts "seeding test user"
  u1 = User.create(name: "Jonathan", pronouns: "he/him/his", age: 1, description: "Ask me about my icebreakers", location: "New York, NY", image: "https://media-exp1.licdn.com/dms/image/C4E03AQFar5W8R6vTFw/profile-displayphoto-shrink_800_800/0/1602806523478?e=1652313600&v=beta&t=0nqDOqDwQ8ql6cOTYx6gLlQJwdGABiTCx2gQL_DB8wc", username: "icebreaker", password: "12345")

puts "seeding profiles"
  p1 = Profile.create(name: "Abe", pronouns: "he/they/theirs", age: 156, description: "Live theatre blows my mind! Take me out to a show?", location: "Springfield", image: "abelincoln.jpeg")
  p2 = Profile.create(name: "Anne", pronouns: "she/her/hers", age: 485, description: "So no head?", location: "London, England", image: "anneboleyn.jpeg")
  p3 = Profile.create(name: "Ben", pronouns: "he/him/his", age: 233, description: "Inventor | Writer | Entrepreneur | West Philadelphia born and raised", location: "Philadelphia, PA", image: "benjaminfranklin.jpeg")
  p4 = Profile.create(name: "Elizabeth", pronouns: "she/her/hers", age: 407, description: "Beauty fanatic, love a good bath bomb.", location: "Budapest, Hungary", image: "elizabethbathory.jpeg")
  p5 = Profile.create(name: "Lizzie", pronouns: "she/her/hers", age: 94, description: "Can I axe you a question? Jk lol, I don\'t do that anymore.", location: "Fall River, MA", image: "lizzieborden.jpeg")
  p6 = Profile.create(name: "Walt", pronouns: "he/him/his", age: 55, description: "Theme park date?", location: "Orlando, FL", image: "waltdisney.jpeg")
  p7 = Profile.create(name: "Julius", pronouns: "he/him/his", age: 2062, description: "It\'s about drive, it\'s about power, we stay hungry, we devour!", location: "Rome, Italy", image: "juliuscaesar.webp")
  p8 = Profile.create(name: "Genghis", pronouns: "he/him/his", age: 794, description: "Travel enthusiast, horse guy", location: "Ulaanbaatar, Mongolia", image: "genghiskhan.jpeg")
  p9 = Profile.create(name: "Public Universal Friend", pronouns: "they/them/theirs", age: 202, description: "Will steal your hoodie, not sorry.", location: "Cumberland, RI", image: "publicuniversalfriend.jpeg")
  p10 = Profile.create(name: "Socrates", pronouns: "?/?/?", age: 2416, description: "Gadfly of Athens, practicing atheist, ENTP", location: "Athens, Greece", image: "socrates.jpeg")
  p11 = Profile.create(name: "Vlad", pronouns: "he/him/his", age: 559, description: "Accept no substitutes", location: "Ambras Castle, Romania", image: "vladtepes.jpeg")
  p12 = Profile.create(name: "Audrey", pronouns: "she/her/hers", age: 28, description: "Breakfast date?", location: "Hollywood, CA", image: "audreyhepburn.jpeg")
  p13 = Profile.create(name: "Katharine", pronouns: "she/her/hers", age: 18, description: "Shoot for the moon, you might just land a star.", location: "Hollywood, CA", image: "katharinehepburn.jpeg")
  p14 = Profile.create(name: "Cixi", pronouns: "she/her/hers", age: 113, description: "gaslight, gatekeep, girlboss", location: "Beijing, China", image: "cixi.jpeg")
  p15 = Profile.create(name: "Shikibu", pronouns: "she/they/theirs", age: 990, description: "Unapolagetic fanfic writer", location: "Kyoto, Japan", image: "murasakishikibu.png")
  p16 = Profile.create(name: "Mary", pronouns: "she/they/theirs", age: 170, description: "Looking for goth sadbois ONLY", location: "London, UK", image: "mary.jpeg")
  p17 = Profile.create(name: "Musa", pronouns: "he/him/his", age: 684, description: "World taveler - gold/crypto investor", location: "Timbuktu, Mali", image: "mansamusa.jpeg")
  p18 = Profile.create(name: "Cleo", pronouns: "she/they/hers", age: 2010, description: "Getting over a few exes, looking for a new adventure!", location: "Alexandria, Egypt", image: "cleopatra.jpeg")
  p19 = Profile.create(name: "Jack", pronouns: "he/him/his", age: 133, description: "Cinema enthusiast. Fav films: Joker, American Psycho, Fight Club", location: "London, UK", image: "jacktheripper.jpeg")
  p20 = Profile.create(name: "James", pronouns: "he/they/his", age: 66, description: "Rebel looking for a cause", location: "Hollywood, CA", image: "jamesdean.jpeg")
  p21 = Profile.create(name: "Joe", pronouns: "he/him/his", age: 69, description: "DM me for my twitter account", location: "Moscow, USSR", image: "joestalin.jpeg")
  p22 = Profile.create(name: "Paul", pronouns: "he/him/his", age: 40, description: "Let me take you out to dinner, I can get us the BEST table.", location: "New York, NY", image: "paulallen.jpeg")
  p23 = Profile.create(name: "Constance", pronouns: "she/her/hers", age: 148, description: "Looking for commitment", location: "Winchester, CA", image: "constance.png")
  p24 = Profile.create(name: "Saeki", pronouns: "she/her/hers", age: 31, description: "I LOVE a good surprise lol", location: "Tokyo, Japan", image: "saeki.png")
  p25 = Profile.create(name: "Alice", pronouns: "she/her/hers", age: 98, description: "So TIRED of no visitors over quarantine. Take me on a date!", location: "Denver, CO", image: "alicethegrudge.jpeg")
  p26 = Profile.create(name: "Marie", pronouns: "she/they/hers", age: 112, description: "People say I'm hard to read? Wtf?", location: "Boston, MA", image: "marie.jpeg")
  p27 = Profile.create(name: "Moonscar", pronouns: "he/him/his", age: 388, description: "Love long walks on the beach under the moonlit fog, my dessicated fingers wrapped around yours...", location: "Pensacola, FL", image: "moonscar.jpeg")
  p28 = Profile.create(name: "Alister", pronouns: "he/they/theirs", age: 597, description: "Here for networking ONLY", location: "Your backyard", image: "alister.jpeg")
  p29 = Profile.create(name: "Opal", pronouns: "they/them/theirs", age: 821, description: "pls message first I am shy", location: "New York, NY", image: "opal.jpeg")
  p30 = Profile.create(name: "Sarah", pronouns: "she/her/hers", age: 376, description: "I have a tendency to girlboss a little too close to the sun.", location: "Salem, MA", image: "sarahstar.png")
  p31 = Profile.create(name: "Owen", pronouns: "he/him/his", age: 133, description: "Have hat, will travel", location: "Anaheim, CA", image: "owen.webp")
  p32 = Profile.create(name: "Vincent", pronouns: "he/him/his", age: 201, description: "Too cool to care...", location: "New York, NY", image: "vincentvangogh.jpeg")
  p33 = Profile.create(name: "Karl", pronouns: "he/him/his", age: 139, description: "Looking for the opium of my heart", location: "London, England", image: "karlmarx.jpeg")
  p34 = Profile.create(name: "Calamity", pronouns: 'she/her/hers', age: 119, description: 'Wild at heart', location: "Pierre, South Dakota", image: 'calamityjane.png')
  p35 = Profile.create(name: "Candyman", pronouns: 'he/him/his', age: 241, description: 'Sweet as honey, I am filled with bees after all', location: "Chicago, IL", image: 'candyman.png')
  p36 = Profile.create(name: "Present", pronouns: 'he/they/theirs', age: 10000, description: 'A feast for ALL senses!', location: "Christmas Eve", image: 'ghostofchristmaspresent.jpeg')
  p37 = Profile.create(name: "Howie", pronouns: 'he/him/his', age: 10, description: 'This is how I win.', location: "New York, NY", image: 'howiebling.jpg')
  p38 = Profile.create(name: "Jason", pronouns: 'he/him/his', age: 65, description: '...', image: 'jason.jpeg', location: 'Camp Crystal Lake')
  p39 = Profile.create(name: "Wakasa", pronouns: 'she/her/hers', age: 387, description: 'Trying not to uhaul, failing miserably', image: 'wakasa.jpeg', location: 'Kyoto, Japan')
  p40 = Profile.create(name: 'Billie', pronouns: 'she/her/hers', age: 63, description: 'Looking to end my solitude', image: 'billieholiday.webp', location: "New York, NY")
  p41 = Profile.create(name: 'Javaman', pronouns: '?/?/?', age: 1000000, description: '?', image: 'javaman.webp', location: "Java")
  p42 = Profile.create(name: 'Simone', pronouns: 'she/her/hers', age: 36, description: 'Not looking for anything serious', image: 'simonebeauvoir.jpeg', location: "Paris, France")
  p43 = Profile.create(name: 'Jean-Paul', pronouns: 'he/him/his', age: 42, description: 'Not looking for anything serious', image: 'sartre.jpeg', location: "Paris, France")
  p44 = Profile.create(name: 'Albert', pronouns: 'he/him/his', age: 62, description: 'I know of only one duty, and that is to love.', image: 'albertcamus.jpeg', location: "Villeblevin, France")

  profile_array = [p1.id, p2.id, p4.id, p5.id, p6.id, p7.id, p8.id, p9.id, p11.id, p12.id, 
  p13.id, p14.id, p15.id, p16.id, p17.id, p18.id, p19.id, p20.id, p21.id, p22.id, p23.id, 
  p24.id, p25.id, p26.id, p27.id, p28.id, p29.id, p30.id, p31.id, p32.id, p33.id, p34.id, 
  p35.id, p36.id, p37.id, p38.id, p39.id, p40.id, p41.id, p42.id, p43.id, p44.id].shuffle

puts "creating interactions"
  l1 = Interaction.create(user_id: u1.id, profile_id: profile_array[0], user_like: nil, profile_like: true, swiped_status: false)
  l2 = Interaction.create(user_id: u1.id, profile_id: profile_array[1], user_like: nil, profile_like: true, swiped_status: false)
  l3 = Interaction.create(user_id: u1.id, profile_id: profile_array[2], user_like: nil, profile_like: true, swiped_status: false)
  l4 = Interaction.create(user_id: u1.id, profile_id: profile_array[3], user_like: nil, profile_like: true, swiped_status: false)
  l5 = Interaction.create(user_id: u1.id, profile_id: profile_array[4], user_like: nil, profile_like: true, swiped_status: false)
  l6 = Interaction.create(user_id: u1.id, profile_id: profile_array[5], user_like: nil, profile_like: true, swiped_status: false)
  l7 = Interaction.create(user_id: u1.id, profile_id: profile_array[6], user_like: nil, profile_like: true, swiped_status: false)
  l8 = Interaction.create(user_id: u1.id, profile_id: profile_array[7], user_like: nil, profile_like: true, swiped_status: false)
  l9 = Interaction.create(user_id: u1.id, profile_id: profile_array[8], user_like: nil, profile_like: true, swiped_status: false)
  l10 = Interaction.create(user_id: u1.id, profile_id: profile_array[9], user_like: nil, profile_like: true, swiped_status: false)
  l11 = Interaction.create(user_id: u1.id, profile_id: profile_array[10], user_like: nil, profile_like: true, swiped_status: false)
  l12 = Interaction.create(user_id: u1.id, profile_id: profile_array[11], user_like: nil, profile_like: true, swiped_status: false)
  l13 = Interaction.create(user_id: u1.id, profile_id: profile_array[12], user_like: nil, profile_like: true, swiped_status: false)
  l14 = Interaction.create(user_id: u1.id, profile_id: profile_array[13], user_like: nil, profile_like: true, swiped_status: false)

puts "have a nice day!"