import { Injectable } from '@angular/core';
import { NGXLogger, NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { BaseStartupService } from './base-startup.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class Logger extends BaseStartupService {
  constructor(private configService: ConfigService, private logger: NGXLogger) {
    super();
  }

  protected load(): Observable<void> {
    const configuration = this.configService.configuration;
    const obs$ = of(null);
    obs$.subscribe((_) => {
      const loggingLevel = configuration.logging.level as number;

      this.logger.updateConfig({
        level: loggingLevel,
      });

      this.logger.registerMonitor(new MyLoggerMonitor());
    });

    return obs$;
  }

  trace(message: any, ...additional: any[]) {
    this.logger.trace(message, ...additional);
  }

  debug(message: any, ...additional: any[]) {
    this.logger.debug(message, ...additional);
  }

  info(message: any, ...additional: any[]) {
    this.logger.info(message, ...additional);
  }

  log(message: any, ...additional: any[]) {
    this.logger.log(message, ...additional);
  }

  warn(message: any, ...additional: any[]) {
    this.logger.warn(message, ...additional);
  }

  error(message: any, ...additional: any[]) {
    this.logger.error(message, ...additional);
  }

  fatal(message: any, ...additional: any[]) {
    this.logger.fatal(message, ...additional);
  }
}

export class MyLoggerMonitor implements NGXLoggerMonitor {
  onLog(_logObject: NGXLogInterface): void {
    // logging stuff to an API if we need a custom transport
  }
}
