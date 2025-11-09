import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  text: string;
  link?: string;
  badge?: string;
  submenu?: SubMenuItem[];
  isOpen?: boolean;
  isActive?: boolean;
}

interface SubMenuItem {
  text: string;
  link: string;
}
@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

   isSidebarOpen = false;
//NOTE - menu array
  mainMenuItems: MenuItem[] = [
    {
      icon: 'fa-house',
      text: 'main',
      link: '/admin/main-dashboard',
      isActive: true
    },
    {
      icon: 'fa-users',
      text: 'Users',
      isOpen: false,
      submenu: [
        { text: 'Admin managment', link: '/admin/addingAdmin' },
        { text: 'Instructor Managment', link: '/admin/addingInstructor' },
        {text:'Student Managment',link:'/admin/StudentDashboard'}
      ]
    },
    {
      icon: 'fa-graduation-cap',
      text: 'Learning Structure',
      isOpen: false,
      submenu: [
        { text: 'Track Managment', link: '/admin/addingClassTrack' },
        { text: 'Class Managment', link: '/admin/addingClassTrack' },
      ]
    },
    {
      icon: 'fa-money-bill',
      text: ' Payments',
      link: '/users',
      badge: '24'
    },
    {
      icon: 'fa-book-bookmark',
      text: 'Subjects ',
      isOpen: false,
      submenu: [
        { text: 'Subject Managment', link: '/admin/addingSubject' },
        { text: 'Unit Managment', link: '/admin/addingSubject' },
        { text: 'Lessons Managment', link: '/admin/addingSubject' },
        { text: 'Quiz managment', link: '/admin/addingSubject' }
      ]
    }
  ];

  settingsMenuItems: MenuItem[] = [
    {
      icon: '⚙️',
      text: 'Settings',
      link: '/settings'
    },
    {
      icon: '🔔',
      text: 'Notifications',
      link: '/notifications',
      badge: '5'
    },
    {
      icon: '🔒',
      text: 'Security',
      link: '/security'
    }
  ];

  //FUNCTION -toggle sidebar 
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
//FUNCTION - toggle submenu
  toggleSubmenu(item: MenuItem): void {
    // Close all other menus
    [...this.mainMenuItems, ...this.settingsMenuItems].forEach(menuItem => {
      if (menuItem !== item && menuItem.submenu) {
        menuItem.isOpen = false;
      }
    });

    //FUNCTION Toggle current menu
    if (item.submenu) {
      item.isOpen = !item.isOpen;
    }
  }
//FUNCTION - ACTIVATE LINKS
  selectMenuItem(item: MenuItem): void {
    //NOTE Remove active from all items
    [...this.mainMenuItems, ...this.settingsMenuItems].forEach(menuItem => {
      menuItem.isActive = false;
    });

    // Set selected item as active
    item.isActive = true;
  }
}
