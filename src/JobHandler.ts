import BaseContext from './BaseContext';
import * as actionTypes from '../src/store/actions';
const TICK_TIME = 500;

interface Task {
    id: string;
    interval: number;
    lastRun: number;
    callback: () => void;
}
export default class JobHandler extends BaseContext {
    private isStarted: boolean;

    private tickTimeout?: NodeJS.Timeout;

    private tasks: Task[];

    constructor(opts: any) {
        super(opts);
        this.isStarted = false;
        this.tasks = [];
    }

    public start = () => {
        if (!this.isStarted) {
            this.tickTimeout = setInterval(this.tick, TICK_TIME);
        }
    };

    public stop = () => {
        this.isStarted = false;
        clearTimeout(this.tickTimeout);
    };

    private tick = () => {
        const currentTime = Date.now();

        this.tasks.forEach(task => {
            if (currentTime - task.lastRun >= task.interval) {
                task.callback();
                task.lastRun = currentTime;
            }
        });
    };

}
