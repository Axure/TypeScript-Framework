export module Persistence {
    export interface IDatabase {
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
}
