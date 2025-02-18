import entities, {IEntityContainer} from './entities';
import ReduxStore from './store';
import coreConfig from '../config';
import * as awilix from 'awilix';
import Navigator from './Navigator';
import './i18n';
import i18next from 'i18next';
import {BaseEntity} from './entities/BaseEntity';
import Connector from './entities/Connector';
import JobHandler from './JobHandler';
import GuardBuilder from '../acl/GuardBuilder';

export interface IContextContainer extends IEntityContainer {
    config: any;
    redux: ReduxStore;
    navigator: Navigator;
    t: Function;
    connector: Connector;
    job: JobHandler;
    guard: GuardBuilder;
}
const container: awilix.AwilixContainer<IContextContainer> =
    awilix.createContainer({
        injectionMode: awilix.InjectionMode.PROXY,
    });

const t = (ctx: IContextContainer) => i18next.t;

async function registerContainer() {

    const connector = container.resolve('connector');

    const job: JobHandler = container.resolve('job');
    job.start();

}

container.register({
    ...entities,
    config: awilix.asValue(coreConfig),
    redux: awilix.asClass(ReduxStore).singleton(),
    navigator: awilix.asClass(Navigator).singleton(),
    t: awilix.asFunction(t).singleton(),
    connector: awilix.asClass(Connector).singleton(),
    job: awilix.asClass(JobHandler).singleton(),
    guard: awilix.asClass(GuardBuilder).singleton(),
});

registerContainer().catch(e => {
    console.error('can not register container', e);
});

export default container;
