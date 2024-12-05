<template>
    <div class="container mt-4">
        <div style="display: flex; justify-content: space-between;">
            <button class="btn btn-primary" v-on:click.prevent ="getCitas">Consultar Citas</button>
            <button class="btn btn-info" v-on:click.prevent ="getCitasDeleted">Citas Eliminadas</button>
            <button class="btn btn-secondary" v-on:click.prevent ="closeSession">Cerrar Sesion</button>
        </div>

      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Paciente</th>
            <th>Tipo</th>
            <th>Medico</th>
            <th>Cita</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody v-if="deleted === 0 && showAgendar != 1">
          <tr v-for="(item, index) in filteredCitas" :key="item.id_cita">
            <td>{{ item.id_cita }}</td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.fecha"
                :disabled="true"
              />
              <span v-else>{{ item.fecha }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.paciente"
              />
              <span v-else>{{ item.paciente }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="number"
                max="4"
                min="1"
                class="form-control"
                v-model="item.id_tipo"
              />
              <span v-else>{{ item.id_tipo }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.nombre_medico"
              />
              <span v-else>{{ item.nombre_medico }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.numero_cita"
                :disabled="true"
              />
              <span v-else>{{ item.numero_cita }}</span>
            </td>

            <td style="display: flex; justify-content: space-around;">
                
              <button
                v-if="editingIndex === index"
                class="btn btn-success btn-sm"
                @click="saveChanges(index)"
              >
                Guardar
              </button>
              <button
                v-else
                class="btn btn-primary btn-sm"
                @click="startEditing(index)"
              >
                Editar
              </button>
              <button class="btn btn-danger btn-sm"
                @click="deleteCita(index)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>

        <!-- Cuerpo de tabla que se mostrara al seleccionar los eliminados -->

        <tbody v-if="deleted === 1 && showAgendar != 1">
          <tr v-for="(item, index) in deletedCitas" :key="item.id_cita">
            <td>{{ item.id_cita }}</td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.fecha"
                :disabled="true"
              />
              <span v-else>{{ item.fecha }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.paciente"
              />
              <span v-else>{{ item.paciente }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.id_tipo"
              />
              <span v-else>{{ item.id_tipo }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.nombre_medico"
              />
              <span v-else>{{ item.nombre_medico }}</span>
            </td>

            <td>
              <input
                v-if="editingIndex === index"
                type="text"
                class="form-control"
                v-model="item.numero_cita"
                :disabled="true"
              />
              <span v-else>{{ item.numero_cita }}</span>
            </td>
            <td>

            </td>
          </tr>
        </tbody>

        <!--  Cuerpo de Tabla que mostrara el formulario de alta -->

        <tbody v-if="showAgendar === 1">
          <tr>
            <td>

            </td>
            
            <td>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                value="2024-12-12T19:30"
                min="2024-12-12T19:30"
                max="2024-12-24T00:00" 
                class="form-control"
                v-model="fecha"
                />
            </td>

            <td>
              <input
                type="text"
                id="paciente"
                name="paciente"
                class="form-control"
                v-model="paciente"
              />
            </td>

            <td>
              <input
                type="number"
                max="4"
                min="1"
                id ="id_tipo"
                name="id_tipo"
                class="form-control"
                pattern="[0-9\/]*"
                v-model="id_tipo"
              />
            </td>

            <td>
              <input
                type="text"
                id="nombre_medico"
                name="nombre_medico"
                class="form-control"
                v-model="nombre_medico"
              />
            </td>

            <td>
              <input
                type="text"
                id="numero_cita"
                name="numero_cita"
                class="form-control"
                v-model="numero_cita"
              />
            </td>

            <td>
              <button
                type="submit"
                class="btn btn-success btn-sm"
                @click="saveCita(reg)"
              >
                Guardar
              </button>
            </td>

          </tr>
        </tbody>

      </table>
      <div style="text-align: center;" class="mensaje-error">
        {{ msjValidation }}
      </div>
    </div>
  </template>
  
  <script  setup>
  
  import { defineProps , defineEmits } from 'vue';
  import { ref, computed } from "vue";
  import axios from 'axios';
  import router from '@/router';


  const emit = defineEmits (['offTableAdd'])

  defineProps({showAgendar:Number})

  const citas = ref([]);
  const citasDeleted = ref([]);
  const deleted = ref(0);
  const msjValidation = ref ('');

  let fecha      = ref('');
  let paciente    = ref('');
  let id_tipo       = ref('');
  let nombre_medico = ref('');
  let numero_cita   = ref('');

    const getCitas = async () => {
        deleted.value = 0;
        emit("offTableAdd");
      try {
          const response = await axios.get("http://reinamadreback/clinica/citas");
          console.log(response.data);
          citas.value = response.data;
      }catch(error){
        console.error("Error al consultar las citas:", error);
        }
      };

    const getCitasDeleted = async () => {
        deleted.value = 1;
        emit("offTableAdd");
      try {
          const response = await axios.get("http://reinamadreback/clinica/citas");
          console.log(response.data);
          citasDeleted.value = response.data;
      }catch(error){
        console.error("Error al consultar las citas:", error);
        }
      };

    
    const filteredCitas = computed(() =>        citas.value.filter(item => item.other == null));
    const deletedCitas  = computed(() => citasDeleted.value.filter(item => item.other != null));

    const editingIndex = ref(null);

    const startEditing = (index) => {
      editingIndex.value = index;
    };

    const saveChanges = async (index) => {
        console.log("Datos a guardar:", filteredCitas.value[index]);
        const citaGuardar = filteredCitas.value[index];
      try {
          const response = await axios.post("http://reinamadreback/clinica/cita", {
              id_cita:  citaGuardar.id_cita,
              fecha:    citaGuardar.fecha,
              paciente: citaGuardar.paciente,
              id_tipo:  citaGuardar.id_tipo,
              nombre_medico: citaGuardar.nombre_medico,
              numero_cita: citaGuardar.numero_cita
            }
          );
          console.log(response.data);
      }catch(error){
        console.error("Error al actualizar la cita", error);
    }
      editingIndex.value = null; // Termina la edición
    };



    const deleteCita = async (index) => {
        console.log("Datos a guardar:", filteredCitas.value[index]);
        const citaGuardar = filteredCitas.value[index];
      try {
          const response = await axios.post("http://reinamadreback/clinica/cita", {
              id_cita:  citaGuardar.id_cita,
              fecha:    citaGuardar.fecha,
              paciente: citaGuardar.paciente,
              id_tipo:  citaGuardar.id_tipo,
              nombre_medico: citaGuardar.nombre_medico,
              numero_cita: citaGuardar.numero_cita,
              other: 'eliminado'
            }
          );
          console.log(response.data);
          getCitas();
      }catch(error){
        console.error("Error al actualizar la cita", error);
    }
      editingIndex.value = null; // Termina la edición
    };


    const saveCita = async () => {

        console.log("Datos a guardar:", fecha.value+" "+paciente.value+" "+id_tipo.value+" "+nombre_medico.value+" "+numero_cita.value);
  
        //Validacion de campos a la antigua (sin usar forms)

        let camp1 =true,camp2 = true,camp3 = true,camp4 = true,camp5 = true, continued = false;

        camp1 = (fecha.value.length !== 16) ? false : camp1;
        camp2 = (paciente.value.length == 0) ? false: camp2;
        camp3 = (id_tipo.value.length == 0) ? false: camp3;
        camp4 = (nombre_medico.value.length == 0) ? false: camp4;
        camp5 = (numero_cita.value.length == 0) ? false : camp5;
        

        if(camp1 == false){
          msjValidation.value = "Valida la fecha del 1er campo";
        }else{
          if(camp2 == false){
            msjValidation.value = "Ingresa el nombre del paciente";
          }else{
            if(camp3 == false){
              msjValidation.value = "Selecciona un tipo";
            }else{
              if(camp4 == false){
                msjValidation.value = "Escribe el nombre del médico";
              }else{
                if(camp5 == false){
                  msjValidation.value = "Ingresa el numero de la cita para temrinar";
                }else{
                  msjValidation.value = "";
                  continued = true;
                }
              }
            }
          }
        }
        

      if(continued == false){
        console.log ("Error en la validacion de los campos, no se puede continuar...")
        }else{

      try {
        //Se completan los valores dela fecha para hacer match con los tipos de datos de JAVA y SQlite
        fecha.value = fecha.value.replace('T',' ');
        fecha.value = fecha.value+":00";
          const response = await axios.post("http://reinamadreback/clinica/cita", {
              fecha:    fecha.value,
              paciente: paciente.value,
              id_tipo:  id_tipo.value,
              nombre_medico: nombre_medico.value,
              numero_cita: numero_cita.value
            }
          );
          console.log(response.data);
          alert('Registro exitoso!')
      }catch(error){
        console.error("Error al actualizar la cita", error);
      }
      }
    };

    const closeSession = () =>{
    console.log("Eliminamos la sesion");
    sessionStorage.removeItem('token');
    console.log("redireccionamos");
    router.push('/');
  }
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  .campo-invalido {
  border: 1px solid red;
  }

  .mensaje-error {
  color: red;
  font-size: 1.3em;
  text-shadow: darkblue;
  }
  </style>