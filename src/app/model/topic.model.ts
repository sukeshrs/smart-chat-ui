import { AdditionalDisplay } from './additional-display.model';

export interface Topic {
    name: string;
    status?: string;
    questions?: String[];
    answers?: String[];
    additionalDisplay?: AdditionalDisplay;
}
