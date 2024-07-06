import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username1!: string;
  email1!: string;
  description1!: string;
  imageUrl1!: string;
  showEditForm: boolean = false;
  editForm!: FormGroup;
  username?: string = '';
  description?: string = '';
  imageUrl?: string = '';
  selectedFile: File | null = null;

  constructor(private profileService: ProfileService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      username: '',
      description: '',
      imageUrl: '',
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.email1 = data.email;
      this.username1 = data.username;
      this.description1 = data.description;
      this.imageUrl1 = data.imageUrl;
    });
  }
  deleteUser() {
    this.profileService.deleteAccount().subscribe(() => {});
  }

  editAccount() {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('username', this.editForm.get('username')?.value);
      formData.append('description', this.editForm.get('description')?.value);
      if (this.selectedFile) {
        formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
      }
      this.profileService.editAccount(formData).subscribe(() => {});
    }
  }
}