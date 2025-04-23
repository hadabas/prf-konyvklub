import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Book } from '../model/Book';
import { Club } from '../model/Club';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

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


    return router;
}