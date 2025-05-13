import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Book } from '../model/Book';
import { Club } from '../model/Club';
import { Rangsor } from '../model/Rangsor';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    // ***
    // Az órán is vett middleware (passport) használatához szükséges lekérdezések, illetve
    // db-vel való kommunikáció authentikálás szempontjából.
    // ***

    router.get('/', (req: Request, res: Response) => {
        res.status(200).send('Hello, World!');
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('Nincs ilyen felhasználónév/jelszó kombinációval felhasználó.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    
    router.post('/register', (req: Request, res: Response) => {
        const username = req.body.username;
        console.log('A KAPOTT USERNAME A REQUESTBŐL: ',req.body.username)
        const email = req.body.email;
        const password = req.body.password;
        const role = 'felhasznalo'
        const user = new User({username: username, password: password, email: email, role: role});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });
    

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });


    router.get('/checkAuth', (req: Request, res: Response) => {

        console.log('SESSION:', req.session);
        console.log('USER:', req.user);

        if (req.isAuthenticated()) {
            res.status(200).json({ authenticated: true, user: req.user });            
        } else {
            res.status(401).json({ authenticated: false });
        }
    });


    /****
    ***** Innestől kezdődnek az adatbázis specifikus lekérdezések és válaszolások.
    *****/

    router.get('/getUser', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            res.status(200).send(req.user);
        } else {
            res.status(401).send(null);
        }
    });

    router.get('/getBookTitles', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            //res.status(200).send(req.user);
            let cimLista: string[] = []

            Book.find({}, 'cim').exec().then(data => {
                data.map(book => cimLista.push(book.cim));
                res.status(200).send(cimLista);
            });

        } else {
            res.status(401).send(null);
        }
    });


    router.post('/registerBook', (req: Request, res: Response) => {
        console.log('A KAPOTT BODY A REQUESTBŐL: ',req.body)
        if(req.body) {
            const cim = req.body.cim;
            const ev = req.body.ev;
            const mufaj = req.body.mufaj;
            const szerzo = req.body.szerzo;
            const book = new Book({cim: cim, ev: ev, mufaj: mufaj, szerzo: szerzo});

            book.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(401).send(null);
        }
    });



    router.post('/registerClub', (req: Request, res: Response) => {
        console.log('A KAPOTT BODY A REQUESTBŐL: ',req.body)
        if(req.body) {
            const klubnev = req.body.klubnev;
            const picture_path = req.body.kep_path; //!!
            const description = req.body.description;
            const recommended_books = JSON.parse(req.body.kivalasztottKonyvek);
            const club = new Club({klubnev: klubnev, picture_path: picture_path, description: description, recommended_books: recommended_books });
            console.log(club);

            club.save().then(data => {
                console.log(data)
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(401).send(null);
        }
    });


    //Ez az ami a rangsorhoz kapcsolódik
    router.post('/registerHonapKonyve', (req: Request, res: Response) => {
        console.log('A KAPOTT BODY A REQUESTBŐL: ',req.body)
        if(req.body) {
            const ev = req.body.ev;
            const honap = req.body.honap;
            const honap_konyve = req.body.honap_konyve;
            //TODO Az első, második, és harmadik helyezettek értékelés alapú kiszámítását itt kell majd elvégezni ha mindennel megvagyok.
            const Rangsor_entry = new Rangsor({ev: ev, honap: honap, honap_konyve: honap_konyve, elsohelyezett: '', masodikhelyezett: '', harmadikhelyezett: ''});
            console.log(Rangsor_entry);

            Rangsor.findOne({ ev: ev, honap: honap }).then(result => {
                if (result) {
                    res.status(500).send("Már meg lett választva a hónap könyve erre a hónapra.");
                    } else {
                        Rangsor_entry.save().then(data => {
                            console.log(data)
                            res.status(200).send(data);
                        }).catch(error => {
                            res.status(500).send(error);
                        })
                    }
            });
        } else {
            res.status(401).send(null);
        }
    });


    // Manageclubs innen kezdődik
    // Ez nem ugyan az, mint a getUser()
    router.get('/mc_getUsers', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            //res.status(200).send(req.user);
            let userLista: string[] = [];

            User.find({}, 'username').exec().then(data => {
                data.map(user => userLista.push(user.username));
                res.status(200).send(userLista);
            });

        } else {
            res.status(401).send(null);
        }
    });

    router.get('/mc_getClubNames', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            //res.status(200).send(req.user);
            let clubNameLista: string[] = [];

            Club.find({}, 'klubnev').exec().then(data => {
                data.map(klub => clubNameLista.push(klub.klubnev));
                res.status(200).send(clubNameLista);
            });

        } else {
            res.status(401).send(null);
        }
    });

    router.post('/mc_addClubMember', (req: Request, res: Response) => {
        console.log('A KAPOTT BODY A REQUESTBŐL: ',req.body)
        if(req.body) {
            const felhnev = req.body.felhasznalonev;
            const klubnev = req.body.klubnev;

            Club.findOne({'klubnev': klubnev}).exec().then(club => {
                if(club?.members.includes(felhnev)) {
                    res.status(400).send('A kért felhasználó már tagja a klubnak.');
                } else {
                    club?.members.push(felhnev);
                    club?.save().then(eredmeny => {
                        res.status(201).json({'message': 'A felhasználó felvevésre került.'});
                    });
                }
            })
        } else {
            res.status(401).send(null);
        }
    });

    router.post('/mc_deleteClubMember', (req: Request, res: Response) => {
        console.log('A KAPOTT BODY A REQUESTBŐL: ',req.body)
        if(req.body) {
            const klubnev = req.body.klubnev;
            const felhnev = req.body.felhasznalonev;

            Club.findOne({'klubnev': klubnev}).exec().then(club => {
                if(club?.members.includes(felhnev)) {
                    club.members = club.members.filter(member => member !== felhnev);
                    club.save().then(eredmeny => {
                        res.status(201).json({'message:': 'A felhasználó törlésre került a klubból.'});
                    });
                } else {
                    res.status(400).send('A törölni kívánt felhasználó nem tagja a klubnak.');
                }
            })
        } else {
            res.status(401).send(null);
        }
    });
    // ADMIN RÉSZ VÉGE


    //Normális felhasználóké
    router.post('/getUserClubs', (req: Request, res: Response) => {
        if(req.body) {
            let marTagja: any = [];
            let megNemTagja: any = [];

            Club.find({}).exec().then(clubs => {
                clubs.forEach(club => {
                    if(club?.members.includes(req.body.username)) {
                        marTagja.push(club);
                    } else {
                        megNemTagja.push(club);
                    }
                });

                let json_response = {
                    'marTagja': marTagja,
                    'megNemTagja': megNemTagja
                }

                res.status(200).json(json_response)
            });
        } else {
            res.status(401).send(null);
        }
        

    });


    router.post('/user_JoinClub', (req: Request, res: Response) => {
        if(req.body) {
            const klubnev = req.body.klubnev;
            const username = req.body.username;
            Club.findOneAndUpdate({'klubnev': klubnev},{ $push: { members: username }}, {new: true}).exec().then(frissitett_klub => {
                res.status(200).json({'message':'Sikeresen csatlakoztál a klubhoz.'});
            })
        } else {
            res.status(401).send(null);
        }
    });

    router.post('/user_LeaveClub', (req: Request, res: Response) => {
        if(req.body) {
            const klubnev = req.body.klubnev;
            const username = req.body.username;
            Club.findOneAndUpdate({'klubnev': klubnev},{ $pull: { members: username }}, {new: true}).exec().then(frissitett_klub => {
                res.status(200).json({'message':'Sikeresen elhagytad a klubot.'});
            })
        } else {
            res.status(401).send(null);
        }
    });

    //Konyvertekeles
    router.post('/getUserBookList', (req: Request, res: Response) => {
        if(req.body) {
            let marErtekelte: any = [];
            let megNemErtekelte: any = [];

            Book.find({}).exec().then(books => {
                books.forEach(book => {
                    if(book?.ertekelok.includes(req.body.username)) {
                        marErtekelte.push(book);
                    } else {
                        megNemErtekelte.push(book);
                    }
                });

                let json_response = {
                    'marErtekelte': marErtekelte,
                    'megNemErtekelte': megNemErtekelte
                }

                res.status(200).json(json_response)
            });
        } else {
            res.status(401).send(null);
        }
    });

    router.post('/rateBookByUser', (req: Request, res: Response) => {
        if(req.body) {
            const bookName = req.body.konyvcim;
            let rating = req.body.ertekeles;
            try {rating = Number(rating);} catch (err) {
                res.status(400).json({'message':"Value not autherized. "+err});
            }
            const username = req.body.username;

            Book.findOneAndUpdate( {'cim': bookName}, {$push: { ertekelok: username, ertekeles_data: rating }}, { new: true }).exec().then(frissitettKonyv => {
        
                let updated_ertekeles = 0;

                if(frissitettKonyv) {
                    if(frissitettKonyv.ertekeles_data.length <= 0) {
                        updated_ertekeles = 0;
                    } else {
                        updated_ertekeles = frissitettKonyv.ertekeles_data.reduce((osszeg, aktualis) => osszeg + aktualis, 0) / frissitettKonyv.ertekeles_data.length;
                    }

                    Book.updateOne({'cim': bookName}, {$set: {'ertekeles': updated_ertekeles}}).exec().then(keszKonyv => {
                        res.status(200).json({'message':'Sikeres értékelés.'});
                    });

                } else {
                    res.status(400).json({'message':'DB Hiba'});
                }
            });
        } else {
            res.status(401).send(null);
        }
    });

    router.get('/ranking_getRangsor', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            let rangsor: any[] = [];

             Rangsor.find({}).exec().then(data => {
                data.map(rangsor_entry => rangsor.push(rangsor_entry));
                res.status(200).send(rangsor);
            });


        } else {
            res.status(401).send(null);
        }
    });


    return router;
}