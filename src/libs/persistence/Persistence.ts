import validator = require("../name_validator/NameValidator");

export module Persistence {

    /**
     * The interface for databases.
     *
     *   1. Must contain a name
     *   @
     */
    export interface IDatabase {

        /**
         * The interface of the database name.
         * @var {IDatabaseName} name
         */
        name: IDatabaseName;

        /**
         *
         * @param key
         * @param value
         */
        save(key: string, value: any): boolean;

        /**
         * Try to retrieve according to the given key.
         * Returns true if successful. False otherwise.
         * @param key
         */
        retrieve(key: string): boolean;

        remove(key: string): boolean;

    }

    /**
     * The interface for database name.
     */
    export interface IDatabaseName {
        /**
         * The variable the represents the actual name.
         * @var {string} self
         */
        self: string;

        //constructor(name: string);
    }

    /**
     * The class for database name.
     * Used as a middleware to make prevent appearance of reserved symbols.
     *
     *   1. Must start in character
     *   2. Must not contain "_"
     *   3. Must not be "index". It is a reserved table.
     *   4. Must not be "self". It is a reserved word.
     */
    export class BasicDatabaseName implements IDatabaseName {
        public self: string;

        constructor(name: string) {
            var myValidator = new validator.NameValidator.TableNameValidator();
            if (myValidator.isValidate(name)) {
                this.self = name;
            } else {
                throw 'The database name must not contain "_", as it is reserved.';
            }
        }
    }

    /**
     * The implementation of basic database type.
     *
     * Two parts: creating and accessing.
     *
     * Database is very generic. It has an internal table called index.
     *
     * Other entries are considered direct entries.
     *
     * The root storage is also regarded as a database.
     */
    export class BasicDatabase implements IDatabase {

        /**
         * The name of the database.
         * @var {BasicDatabaseName} name.
         */
        public name: BasicDatabaseName;
        private ancestors: Array<BasicDatabase>;

        constructor(name: string) {
            try {
                this.name = new BasicDatabaseName(name);
            } catch (e) {
                console.log(`Error at creating database:${e}.`);
                throw e;
            } finally {
                var storage = window.localStorage;
                var index = {};
                //storage.setItem(this.name.self, JSON.stringify(index));
            }

        }

        /**
         * Creates the database (when it does not yet exist.)
         */
        createSelf() {

        }

        private getIndex(): any {
            var storage = window.localStorage;
            var index = storage.getItem(this.name.self);

            return index;
        }

        public save(key: string, value: any): boolean {
            try {
                var myData
            } catch (e) {
                return false;
            }
            return true;
        }

        retrieve(key: string): boolean {
            try {

            } catch (e) {
                return false;
            }
            return true;
        }

        remove(key: string): boolean {
            try {

            } catch (e) {
                return false;
            }
            return true;
        }

        depict() {

        }

        createDatabase(name: string) {

        }

        setParent() {

        }

        getParent() {

        }

        /*
        Todo: Lazy add column and takes effect only when accessing.
         */
    }

    export interface ITable {

        setAsIndex(columnName: string);
        addColumn();


    }

    //export class KvDatabase implements IDatabase {
    //
    //}

    /**
     * A simple wrapper for k-v database.
     */
    export class KvDatabase {
        // TODO: apply some design patterns.
        private name: BasicDatabaseName;
        private size: number;
        private blockSize: number = 10;

        realKey(key: string): string {
            return `${this.name.self}-${key}`;
        }

        constructor(name: string) {
            try {
                this.name = new BasicDatabaseName(name);
            } catch (e) {
                console.log(`Error at creating database:${e}.`);
                throw e;
            } finally {
                var storage = window.localStorage;
                var index = {};

                /** If the name already exists */
                var sizeString: string;
                if ((sizeString = storage.getItem(this.name.self)) != null) {
                    this.size = parseInt(sizeString);

                } else {
                    /** Creates the item */
                    storage.setItem(this.name.self, "0");
                    this.size = 0;
                }


            }

        }

        add(key: string, value: string) {
            var storage = window.localStorage;
            var result: string = storage.getItem(this.realKey(key));
            /** Check if the entry with the given key exists. */
            if (result == null) {
                throw `Entry already exists.`;
            } else {
                storage.setItem(this.realKey(key), value);
            }
        }

        remove(key: string) {
            var storage = window.localStorage;
            var result: string = storage.getItem(this.realKey(key));
            /** Check if the entry with the given key exists. */
            if (result == null) {
                throw "Delete emtpy.";
            }
            try {
                storage.removeItem(this.realKey(key));
            } catch (e) {
                throw `Deletion error: ${e}.`;
            }
        }

        retrieve(key: string): string {
            var storage = window.localStorage;
            var result: string;
            try {
                result = storage.getItem(this.realKey(key));
            } catch (e) {
                throw `Retrieve error: ${e}.`
            }
            if (result == null) {
                throw "Retrieve empty.";
            }
            return result;
        }

    }
}
