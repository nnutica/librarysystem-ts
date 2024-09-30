"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.library = void 0;
const fs = __importStar(require("fs"));
;
var Genre;
(function (Genre) {
    Genre["Fiction"] = "fiction";
    Genre["NonFiction"] = "NonFiction";
    Genre["Fantasy"] = "Fantasy";
    Genre["Learning"] = "Learning";
})(Genre || (Genre = {}));
//8 Create Class
class Library {
    constructor() {
        this.inventory = [];
    }
    //3 Implement Basic Functions for Adding Books
    AddBook(book) {
        this.inventory.push(book);
        console.log(`${book.title} by ${book.author} has been added to inventory.`);
    }
    //4 Implement a Function to List All Books
    listbooks() {
        if (this.inventory.length === 0) {
            return console.log("No book in inventory now");
        }
        console.log("Listing all book in the inventory:");
        this.inventory.forEach((book) => {
            console.log(`ID:${book.id}, title:${book.title} , author: ${book.author} status:${book.availability}`);
        });
    }
    //5  Implement Search Functionality Using keyof and typeof
    searchBooks(key, value) {
        return this.inventory.filter((book) => book[key] === value);
    }
    //6 Add Update Book Functionality with Conditional Types 
    updatebook(id, updates) {
        const book = this.inventory.find((book) => book.id === id);
        if (!book) {
            return console.log(`Book with ID ${id} not found`);
        }
        Object.assign(book, updates);
        console.log(`The Book with ID ${id} has been updated`);
    }
    //7 Implement Deletion of Books Using Type Assertions
    deletebook(id) {
        const index = this.inventory.findIndex((book) => book.id === id);
        if (index !== -1) {
            this.inventory.splice(index, 1);
            console.log(`Book with ID ${id} has been deleted`);
        }
        else {
            console.log(`Book with ID ${id} not found`);
        }
    }
    checkOutBook(id, dueDate) {
        const index = this.inventory.findIndex((book) => book.id === id);
        if (index !== -1 && this.inventory[index].availability === "available") {
            const checkedOutBook = Object.assign(Object.assign({}, this.inventory[index]), { availability: "checked out", dueDate });
            this.inventory[index] = checkedOutBook;
            console.log(`Book with ID ${id} has been checked out and is due on ${dueDate}.`);
        }
        else {
            console.log(`Book with ID ${id} is either not available or not found.`);
        }
    }
    returnBook(id) {
        const index = this.inventory.findIndex((book) => book.id === id);
        if (index !== -1 && this.inventory[index].availability === "checked out") {
            const availableBook = Object.assign(Object.assign({}, this.inventory[index]), { availability: "available" });
            this.inventory[index] = availableBook;
            console.log(`Book with ID ${id} has been returned and is now available.`);
        }
        else {
            console.log(`Book with ID ${id} is either not checked out or not found.`);
        }
    }
    // Save inventory to file
    saveToFile(filePath) {
        const data = JSON.stringify(this.inventory, null, 2);
        fs.writeFileSync(filePath, data);
        console.log('Inventory saved to file');
    }
    // Load inventory from file
    loadFromFile(filePath) {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            this.inventory = JSON.parse(data);
            console.log('Inventory loaded from file');
        }
        else {
            console.log('File does not exist');
        }
    }
    displayBooks() {
        const bookListDiv = document.getElementById("bookList");
        if (bookListDiv) {
            bookListDiv.innerHTML = ""; // Clear existing content
            if (this.inventory.length === 0) {
                bookListDiv.innerHTML = "<p>No books in inventory.</p>";
                return;
            }
            let html = "<ul>";
            this.inventory.forEach(book => {
                html += `<li>ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Status: ${book.availability}</li>`;
            });
            html += "</ul>";
            bookListDiv.innerHTML = html; // Display updated book list
        }
    }
}
exports.library = new Library();
exports.library.AddBook({
    id: 1,
    title: "Abz",
    author: "Yaimakmak",
    genre: Genre.Learning,
    publishedyear: 2010,
    availability: "available"
});
exports.library.AddBook({
    id: 2,
    title: "เรียนแบบไหนให้อยากลาออก",
    author: "Yaimakmak",
    genre: Genre.Learning,
    publishedyear: 2010,
    availability: "available",
});
exports.library.AddBook({
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: Genre.Fiction,
    publishedyear: 1925,
    availability: "available",
});
// 1. Searching for a non-existent book
console.log("\n--- Searching for non-existent book ---");
const searchResult = exports.library.searchBooks("title", "Non-existent Book");
if (searchResult.length === 0) {
    console.log("No books found with the title 'Non-existent Book'.");
}
else {
    console.log(searchResult);
}
// 10.2) Updating a non-existent book
console.log("\n--- Updating a non-existent book ---");
exports.library.updatebook(999, { title: "Non-existent Book" });
// 10.3) Deleting a non-existent book
console.log("\n--- Deleting a non-existent book ---");
exports.library.deletebook(999);
// 10.4) Updating an existing book without any changes
console.log("\n--- Updating an existing book without any changes ---");
exports.library.updatebook(1, {}); // No changes passed in the updates
// 10.5) Searching for an existing book by genre
console.log("\n--- Searching for an existing book by genre ---");
const bookfound = exports.library.searchBooks("author", "Yaimakmak");
if (bookfound.length === 0) {
    console.log("No books found in the Yaimakmak author.");
}
else {
    console.log(bookfound);
}
// 10.6) Trying to check out an already checked-out book
console.log("\n--- Checking out a book ---");
exports.library.checkOutBook(1, "2024-10-01");
console.log("\n--- Trying to check out the same book again ---");
exports.library.checkOutBook(1, "2024-11-01"); // Book is already checked out
// 10.7) Trying to return a book that's already available
console.log("\n--- Returning the checked-out book ---");
exports.library.returnBook(1);
console.log("\n--- Trying to return the same book again ---");
exports.library.returnBook(1); // Book is already available
// 10.8) Listing all books after performing operations
console.log("\n--- Final inventory list after all operations ---");
exports.library.listbooks();
exports.library.saveToFile('inventory.json');
exports.library.loadFromFile('inventory.json');
