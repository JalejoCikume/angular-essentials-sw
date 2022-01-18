import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogService } from './log.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {
    private characters = [
        { name: 'Luke Skywalker', side: '' },
        { name: 'Darth Vader', side: '' }
    ];

    private logService: LogService

    charactersChanged = new Subject<void>();
    http: HttpClient;

    constructor(logService: LogService, http: HttpClient) {
        this.logService = logService;
        this.http = http;
    }

    getCharacters(chosenList) {
        if (chosenList === 'all') {
            return this.characters.slice();
        }

        return this.characters.filter((char) => char.side === chosenList);
    }

    fetchCharacters() {
        this.http.get('https://swapi.dev/api/people/')
            .subscribe(
                (response) => {
                    const chars = response['results'].map((char) => {
                        return { name: char.name, side: '' }
                    })
                    this.characters = chars;
                    this.charactersChanged.next()
                }
            )
    }

    onSideChosen(charInfo) {
        const pos = this.characters.findIndex((char) => char.name === charInfo.name);

        this.characters[pos].side = charInfo.side;
        this.charactersChanged.next();
        this.logService.writeLog(`Changed side of ${charInfo.name}, new side: ${charInfo.side}`)
    }

    addCharacter(name, side) {
        const pos = this.characters.findIndex((char) => char.name === name);

        if (pos !== -1) {
            return;
        }

        const newChar = { name, side }
        this.characters.push(newChar);
    }

}
