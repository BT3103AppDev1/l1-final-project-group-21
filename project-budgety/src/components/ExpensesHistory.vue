<template>
    <MDBTable class="align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style="width: 45px; height: 45px"
                class="rounded-circle" />
              <div class="ms-3">
                <p class="fw-bold mb-1">John Doe</p>
                <p class="text-muted mb-0">john.doe@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">Software engineer</p>
            <p class="text-muted mb-0">IT department</p>
          </td>
          <td>
            <MDBBadge badge="success" pill class="d-inline">Active</MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color="link" size="sm" rounded>
              Edit
            </MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <img src="https://mdbootstrap.com/img/new/avatars/6.jpg" class="rounded-circle" alt=""
                style="width: 45px; height: 45px" />
              <div class="ms-3">
                <p class="fw-bold mb-1">Alex Ray</p>
                <p class="text-muted mb-0">alex.ray@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">Consultant</p>
            <p class="text-muted mb-0">Finance</p>
          </td>
          <td>
            <MDBBadge badge="primary" pill class="d-inline">Onboarding</MDBBadge>
          </td>
          <td>Junior</td>
          <td>
            <MDBBtn color="link" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }">
              Edit
            </MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <img src="https://mdbootstrap.com/img/new/avatars/7.jpg" class="rounded-circle" alt=""
                style="width: 45px; height: 45px" />
              <div class="ms-3">
                <p class="fw-bold mb-1">Kate Hunington</p>
                <p class="text-muted mb-0">kate.hunington@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">Designer</p>
            <p class="text-muted mb-0">UI/UX</p>
          </td>
          <td>
            <MDBBadge badge="warning" pill class="d-inline">Awaiting</MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color="link" size="sm" rounded class="fw-bold" :ripple="{ color: 'dark' }">
              Edit
            </MDBBtn>
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </template>
<script>
  import {
    MDBTable,
    MDBBtn,
    MDBBadge
  } from 'mdb-vue-ui-kit';

  export default {
    name: 'ExpensesHistory'
  }
</script>