import { Router } from 'express';

import { AuthService, PassportStrategy } from '@services/auth';

import { ConfigController } from './controller';

export class ConfigRoutes {
	private authSerivce: AuthService;
	private readonly _router: Router = Router();
	private readonly controller: ConfigController = new ConfigController();

	public constructor(defaultStrategy?: PassportStrategy) {
		this.authSerivce = new AuthService(defaultStrategy);
		this.initRoutes();
	}

	public get router(): Router {
		return this._router;
	}

	private initRoutes() {
		/**
		 * Caches
		 */
		this._router.get(
			'/caches',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'getCachesMetadata'),
			this.controller.getCachesMetadata
		);
		this._router.delete(
			'/caches',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'deleteCachesMetadata'),
			this.controller.deleteCachesMetadata
		);
		this._router.get(
			'/caches/:key',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'getCacheKeyData'),
			this.controller.getCacheKeyData
		);
		this._router.delete(
			'/caches/:key',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'deleteCacheKeyData'),
			this.controller.deleteCacheKeyData
		);

		/**
		 * Logs
		 */
		this._router.get(
			'/logs',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'getLogfiles'),
			this.controller.getLogfiles
		);
		this._router.get(
			'/logs/:logfile',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'readLogfile'),
			this.controller.readLogfile
		);
		this._router.delete(
			'/logs/:logfile',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'deleteLogfile'),
			this.controller.deleteLogfile
		);
		this._router.get(
			'/logs/:logfile/download',
			this.authSerivce.isAuthorized(),
			this.authSerivce.hasPermission('config', 'downloadLogfile'),
			this.controller.downloadLogfile
		);
	}
}