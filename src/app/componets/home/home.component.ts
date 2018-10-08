
import { User } from './../../model/user';
import { Contact } from './../../model/contact';
import { Component, OnInit, EventEmitter, TemplateRef } from '@angular/core';
import { Sort } from '../../model/sort';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ApiService } from '../../commons/service/app.service';
import { AuthService } from '../../commons/service/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    urlContactController = '/contact';
    contactList: Contact[] = [];
    modalRef: BsModalRef;

    pageSize = 10;
    sorting = 'id,desc';
    eventSort: EventEmitter<Sort> = new EventEmitter();
    totalElements = 0;
    currentPage = 0;
    userLogin: User;

    contactForm: FormGroup;
    idContactSelected = 0;
    constructor(private apiService: ApiService,
        private authService: AuthService,
        private router: Router,
        private modalService: BsModalService) {

        this.userLogin = JSON.parse(localStorage.getItem('currentUser'));
        this.eventSort.subscribe((sort: Sort) => {
            this.sorting = sort.property + ',' + sort.dir;
            this.firstPage();
        });
    }


    ngOnInit(): void {
        this.firstPage();

        this.contactForm = new FormGroup({
            name: new FormControl('', Validators.required),
            nickName: new FormControl('', Validators.required),
            age: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required)
        });
    }

    firstPage() {
        this.currentPage = 0;
        this.getAllContact(this.currentPage);
    }

    getAllContact(pageNumber: number) {
        this.apiService.getPagesSort(this.urlContactController + '/getPage', pageNumber, this.pageSize, this.sorting)
            .subscribe(
                result => {
                    this.contactList = result.content;
                    this.totalElements = result.totalElements;
                },
                error => {
                    console.log(error);
                }
            );
    }

    pageChanged(page: number) {
        const currentPage = (page - 1);
        this.getAllContact(currentPage);
    }

    closeLogin() {
        this.authService.logOut();
        this.router.navigate(['/login']);
    }
    onCancel() {
        this.contactForm.reset();
        this.idContactSelected = 0;
    }

    onSaveContact(): void {
        this.apiService.addElement(this.urlContactController + '/saveContact', this.getObjectContact(this.contactForm.value))
            .subscribe(
                result => {
                    alert('se guardo el contacto correctamente');
                    this.firstPage();
                    this.onCancel();
                },
                error => {
                    alert('Ha ocurrido un error al guardar el contacto');
                }
            );
    }

    onEdit(contact: Contact) {
        this.idContactSelected = contact.id;
        this.contactForm.setValue({
            name: contact.name,
            nickName: contact.nickName,
            age: contact.age,
            phoneNumber: contact.phoneNumber
        });
    }


    getObjectContact(formValue: any): Contact {
        const contact: Contact = new Contact();
        contact.id = this.idContactSelected !== 0 ? this.idContactSelected : 0;
        contact.name = formValue.name;
        contact.nickName = formValue.nickName;
        contact.age = formValue.age;
        contact.phoneNumber = formValue.phoneNumber;
        return contact;
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
    onDeleteContact() {
        this.apiService.deleteElement(this.urlContactController + '/DeleteContact', this.idContactSelected)
        .subscribe(
            result => {
                alert('Se elimino correctamente');
                this.firstPage();
            },
            error => {
                alert('Ha ocurrido un error al eliminar el contacto');
            }
        );
        this.modalRef.hide();
        this.idContactSelected = 0;
    }

    cancelDelete() {
        this.modalRef.hide();
        this.idContactSelected = 0;
    }

}
