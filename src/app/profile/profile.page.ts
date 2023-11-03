import { Component, OnInit  } from '@angular/core';
import { ConfigService } from '../config.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {NurseService} from "../shared/services/nurse.service";
import {ValidationService} from "../shared/services/validation.service";
import {CountrySelectPage} from "../register/country-select/country-select.page";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: any;
  genders = [{name: "Male", id: "male"}, {name: "Female", id: "female"}];
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    organization: ['', [Validators.required]],
    country: ['', [Validators.required]],
    sex: ['', [Validators.required]],
  });
  errorMessage: string;
  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private router: Router,
      private modalController: ModalController,
      private nurseService: NurseService,
      public validationService: ValidationService,
      public configService: ConfigService) {
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = '';
    })
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      this.fillForm();
    }
  }

  fillForm() {
    this.form = this.fb.group({
      email: [{value:this.currentUser.email, disabled: true}, [Validators.required, Validators.email]],
      firstName: [{value: this.currentUser.firstName, disabled: true}, [Validators.required]],
      lastName: [{value: this.currentUser.lastName, disabled: true}, [Validators.required]],
      phoneNumber: [{value: this.currentUser.phoneNumber, disabled: true}, [Validators.required]],
      organization: [{value: this.currentUser.organization, disabled: true}, [Validators.required]],
      country: [{value: this.currentUser.country, disabled: true}, [Validators.required]],
      sex: [{value: this.currentUser.sex, disabled: true}, [Validators.required]],
    });
  }

  goToLogin() {
    this.router.navigate(["/requester"])
  }

  async openCountrySelect() {
    const countrySelect = await this.modalController.create({
      component: CountrySelectPage,
      animated: true
    });

    await countrySelect.present();
    const { data } = await countrySelect.onWillDismiss();
    if (data) {
      if (data.country) {
        const country = data.country;
        this.form.controls.country.setValue(country.name);
      }
    }

  }

  onSubmit() {
    const {value} = this.form;
    const user = {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
      organization: value.organization,
      country: value.country,
      sex: value.sex,
    }
  }

  getErrorMessage(formField: string) {
    switch (formField) {
      case 'email':
        const emailErrors = this.form.controls.email.errors;
        if (emailErrors.required) {
          return 'Email is required';
        } else {
          return 'Invalid email address';
        }
      case 'firstName':
        const nameErrors = this.form.controls.firstName.errors;
        if (nameErrors.required) {
          return 'Firstname is required';
        }
        break;
      case 'lastName':
        const surnameErrors = this.form.controls.lastName.errors;
        if (surnameErrors.required) {
          return 'Lastname is required';
        }
        break;
      case 'phoneNumber':
        const phoneNumberErrors = this.form.controls.phoneNumber.errors;
        if (phoneNumberErrors.required) {
          return 'Phone number is required';
        }
        break;
      case 'organization':
        const organizationErrors = this.form.controls.organization.errors;
        if (organizationErrors.required) {
          return 'Organization is required';
        }
        break;
      case 'country':
        const countryErrors = this.form.controls.country.errors;
        if (countryErrors.required) {
          return 'Country is required';
        }
        break;
    }
  }

}
