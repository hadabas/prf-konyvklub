import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBook extends Document {
    cim: string,
    ev: string;
    mufaj: string;
    szerzo: string;
    ertekeles: number;
    ertekelok: string[];
}

const BookSchema: Schema<IBook> = new mongoose.Schema({
    cim: { type: String, required: true }, 
    ev: { type: String, required: true },
    mufaj: { type: String, required: true },
    szerzo: { type: String, required: true },
    ertekeles: { type: Number, required: true, default: 0.0 },
    ertekelok: {type: [String], required: true, default: []}
});

export const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema, 'Books'); //Az első a név, második a séma, harmadik a kollekciónak a neve, ahová mentődik.