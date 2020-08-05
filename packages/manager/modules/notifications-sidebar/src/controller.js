import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';

import { Environment } from '@ovh-ux/manager-config';
import { emit, listen } from '@ovh-ux/ufrontend/communication';
import { MAX_NOTIFICATIONS } from './constants';

export default class NotificationsCtrl {
  /* @ngInject */
  constructor(
    $q,
    $timeout,
    $translate,
    atInternet,
    NavbarNotifications,
    ovhManagerNavbarMenuHeaderBuilder,
    ouiNavbarConfiguration,
    TranslateService,
  ) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.atInternet = atInternet;
    this.toggle = false;
    this.NavbarBuilder = ovhManagerNavbarMenuHeaderBuilder;
    this.NavbarNotifications = NavbarNotifications;
    this.TranslateService = TranslateService;
    this.translations = ouiNavbarConfiguration.translations;

    this.REGION = Environment.getRegion();
  }

  $onInit() {
    this.isLoading = true;
    this.numberOfActiveNotifications = 0;

    return this.$translate
      .refresh()
      .then(() =>
        this.$q.all({
          menuTitle: this.getMenuTitle(),
          sublinks: this.getSublinks(),
        }),
      )
      .then(({ menuTitle, sublinks }) => {
        this.NavbarNotifications.setRefreshTime(sublinks);
        this.menuTitle = menuTitle;
        if (sublinks.length > MAX_NOTIFICATIONS) {
          this.sublinks = sublinks.slice(0, MAX_NOTIFICATIONS);
        } else {
          this.sublinks = sublinks;
        }
        this.numberOfActiveNotifications = this.getNumberOfActiveNotifications();
        this.groupedSublinks = groupBy(this.sublinks, 'time');

        emit({
          id: 'ovh.notifications.count',
          count: this.numberOfActiveNotifications,
        });
      })
      .finally(() => {
        this.isLoading = false;
        this.listenForEvents();
      });
  }

  listenForEvents() {
    listen(({ id }) => {
      this.$timeout(() => {
        if (id === 'ovh.notifications.toggle') {
          this.toggle = !this.toggle;
          if (this.toggle) {
            this.atInternet.trackClick({
              name: 'navbar::action::notifications',
              type: 'action',
            });
          }
        } else if (id === 'ovh.notifications.hide') {
          this.toggle = false;
        }
      });
    });
  }

  getNumberOfActiveNotifications() {
    return filter(this.sublinks, (notification) => notification.isActive)
      .length;
  }

  toggleSublinkAction(toUpdate, linkClicked) {
    this.NavbarNotifications.toggleSublinkAction(toUpdate, linkClicked).then(
      (notification) => {
        this.numberOfActiveNotifications = this.getNumberOfActiveNotifications();
        return notification;
      },
    );
  }

  getMenuTitle() {
    return this.NavbarBuilder.buildMenuHeader(
      this.$translate.instant('navbar_notification_title'),
    );
  }

  getSublinks() {
    return this.NavbarNotifications.getNotifications(
      this.TranslateService.getUserLocale(),
      this.REGION,
    )
      .then((notifications) =>
        notifications.map((notification) =>
          this.NavbarNotifications.constructor.convertToSubLink(notification),
        ),
      )
      .catch(() => undefined);
  }
}
