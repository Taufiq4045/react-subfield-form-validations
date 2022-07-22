import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Multiselect } from 'multiselect-react-dropdown';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.min.css';

const regex1 = /^[a-z\d\s]+$/i;
const regex2 = /^[ A-Za-z0-9_@./#&+-]*$/;
const regex3 = /^[0-9]*$/;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [showhide, setShowhide]=useState('');
  
   const handleshowhide=(event)=>{
     const getuser = event.target.value;
     console.log(getuser);    
     setShowhide(getuser);
    }

    const messageField = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { id, name, message, type, messageFormat, headerFormat, messageField, isDecline, orgShould, batchNo, networkFormat } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        id,
        name,
        message,
        type,
        messageFormat,
        headerFormat,
        messageField,
        isDecline,
        orgShould,
        batchNo,
        networkFormat
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );

      // Reset contact form fields after submission
      reset();
      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='id'
                      {...register('id', {
                        required: {
                          value: true,
                          message: 'Please enter template id'
                        },
                        minLength: {
                          value: 5,
                          message: 'Please use 5 characters or more'
                        },
                        maxLength: {
                          value: 10,
                          message: 'Please use 10 characters or less'
                        },
                        pattern: {
                          value: regex1,
                          message: 'Please use alphanumeric values only'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Template Id'
                    ></input>
                    {errors.id && <span className='errorMessage'>{errors.id.message}</span>}
                  </div>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Please enter template name'
                        },
                        minLength: {
                          value: 10,
                          message: 'Please use 10 characters or more'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Please use 20 characters or less'
                        },
                        pattern: {
                          value: regex2,
                          message: 'Please use alphanumeric values'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Template Name'
                    ></input>
                    {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='text'
                      name='message'
                      {...register('message', {
                        required: {
                          value: true,
                          message: 'Please enter your message'
                        },
                        minLength: {
                          value: 10,
                          message: 'Message cannot lesser than 10 characters'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Message cannot exceed 20 characters'
                        },
                        pattern: {
                          value: regex1,
                          message: 'Please use alphanumeric values only'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Message'
                    ></input>
                    {errors.message && (
                      <span className='errorMessage'>{errors.message.message}</span>
                    )}
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <select 
                        name='type'
                        {...register('type', {
                            required: {
                              value: true,
                              message: 'Please select message type'
                            }
                        })} 
                        className='form-control formInput'
                        onChange={(e)=>(handleshowhide(e))}                      
                        ><option value="">--Select Message Type--</option>
                        <option value="1">0100</option>
                        <option value="2">0200</option>
                        <option value="3">0400</option>
                        <option value="4">0500</option>
                        <option value="5">0800</option>
                    </select>                  
                    {errors.type && (
                      <span className='errorMessage'>{errors.type.message}</span>
                    )}
                  </div>
                </div>
                {/* Row sub-fields of form */}
                    { showhide==='1' && (
                        <>
                        <div className='row formRow'>
                          <div className='col-6'>
                            <select 
                              name='messageFormat'   
                              {...register('messageFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select format type'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Format Type-</option>
                              <option>JSON</option>
                              <option>ISO</option>
                            </select>                  
                            {errors.messageFormat && (
                            <span className='errorMessage'>{errors.messageFormat.message}</span>
                            )}
                          </div>
                          <div className='col-6'>
                            <select 
                              name='headerFormat'   
                              {...register('headerFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select header format'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Header Type-</option>
                              <option>0BN</option>
                              <option>2BN</option>
                            </select>                  
                            {errors.headerFormat && (
                            <span className='errorMessage'>{errors.headerFormat.message}</span>
                            )}
                          </div>
                        </div>
                        <div className='row formRow'>
                            <div className='col'>
                                <Multiselect
                                    name='messageField'                                    
                                    showArrow options={messageField} 
                                    isObject={false} />
                            </div>
                        </div>
                        </>
                    )}
                    { showhide==='2' && (
                        <>
                        <div className='row formRow'>
                          <div className='col-4'>
                            <select 
                              name='messageFormat'   
                              {...register('messageFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select format type'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Format Type-</option>
                              <option>JSON</option>
                              <option>ISO</option>
                            </select>                  
                            {errors.messageFormat && (
                            <span className='errorMessage'>{errors.messageFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='headerFormat'   
                              {...register('headerFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select header format'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Header Type-</option>
                              <option>0BN</option>
                              <option>2BN</option>
                            </select>                  
                            {errors.headerFormat && (
                            <span className='errorMessage'>{errors.headerFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='isDecline'   
                              {...register('isDecline', {
                                  required: {
                                    value: true,
                                    message: 'Please select isDecline'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-isDecline-</option>
                              <option>TRUE</option>
                              <option>FALSE</option>
                            </select>                  
                            {errors.isDecline && (
                            <span className='errorMessage'>{errors.isDecline.message}</span>
                            )}
                          </div>
                        </div>
                        <div className='row formRow'>
                            <div className='col'>
                                <Multiselect 
                                    name='messageField'
                                    showArrow options={messageField} 
                                    isObject={false} />
                            </div>
                        </div>
                        </>
                    )}
                    { showhide==='3' && (
                        <>
                        <div className='row formRow'>
                          <div className='col-4'>
                            <select 
                              name='messageFormat'   
                              {...register('messageFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select format type'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Format Type-</option>
                              <option>JSON</option>
                              <option>ISO</option>
                            </select>                  
                            {errors.messageFormat && (
                            <span className='errorMessage'>{errors.messageFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='headerFormat'   
                              {...register('headerFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select header format'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Header Type-</option>
                              <option>0BN</option>
                              <option>2BN</option>
                            </select>                  
                            {errors.headerFormat && (
                            <span className='errorMessage'>{errors.headerFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='orgShould'   
                              {...register('orgShould', {
                                  required: {
                                    value: true,
                                    message: 'Please select orgShould Present'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-orgShould Present-</option>
                              <option>TRUE</option>
                              <option>FALSE</option>
                            </select>                  
                            {errors.orgShould && (
                            <span className='errorMessage'>{errors.orgShould.message}</span>
                            )}
                          </div>
                        </div>
                        <div className='row formRow'>
                            <div className='col'>
                                <Multiselect 
                                    name='messageField'
                                    showArrow options={messageField} 
                                    isObject={false} />
                            </div>
                        </div>
                        </>
                    )}
                    { showhide==='4' && (
                        <>
                        <div className='row formRow'>
                          <div className='col-4'>
                            <select 
                              name='messageFormat'   
                              {...register('messageFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select format type'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Format Type-</option>
                              <option>JSON</option>
                              <option>ISO</option>
                            </select>                  
                            {errors.messageFormat && (
                            <span className='errorMessage'>{errors.messageFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='headerFormat'   
                              {...register('headerFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select header format'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Header Type-</option>
                              <option>0BN</option>
                              <option>2BN</option>
                            </select>                  
                            {errors.headerFormat && (
                            <span className='errorMessage'>{errors.headerFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <input
                              type='text' 
                              name='batchNo'   
                              {...register('batchNo', {
                                  required: {
                                    value: true,
                                    message: 'Please input Batch No'
                                  },
                                  pattern: {
                                      value: regex3,
                                      message: 'Please enter only numbers'
                                  },
                                  minLength: {
                                    value: 3,
                                    message: 'Batch No cannot lesser than 3 numbers'
                                  },
                                  maxLength: {
                                    value: 5,
                                    message: 'Batch No cannot greater than 5 numbers'
                                  }
                              })} 
                              className='form-control formInput'
                              placeholder='Batch No'
                              ></input>                  
                            {errors.batchNo && (
                            <span className='errorMessage'>{errors.batchNo.message}</span>
                            )}
                          </div>
                        </div>
                        <div className='row formRow'>
                            <div className='col'>
                                <Multiselect
                                    name='messageField' 
                                    showArrow options={messageField} 
                                    isObject={false} />
                            </div>
                        </div>
                        </>
                    )}
                    { showhide==='5' && (
                        <>
                        <div className='row formRow'>
                          <div className='col-4'>
                            <select 
                              name='messageFormat'   
                              {...register('messageFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select format type'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Format Type-</option>
                              <option>JSON</option>
                              <option>ISO</option>
                            </select>                  
                            {errors.messageFormat && (
                            <span className='errorMessage'>{errors.messageFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='headerFormat'   
                              {...register('headerFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select header format'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Message Header Type-</option>
                              <option>0BN</option>
                              <option>2BN</option>
                            </select>                  
                            {errors.headerFormat && (
                            <span className='errorMessage'>{errors.headerFormat.message}</span>
                            )}
                          </div>
                          <div className='col-4'>
                            <select 
                              name='networkFormat'   
                              {...register('networkFormat', {
                                  required: {
                                    value: true,
                                    message: 'Please select network message format'
                                  }
                              })} 
                              className='form-control formInput'
                              ><option value="">-Select Network Message Format-</option>
                              <option>Netwotk Message Format</option>
                            </select>                                             
                            {errors.networkFormat && (
                            <span className='errorMessage'>{errors.networkFormat.message}</span>
                            )}
                          </div>
                        </div>
                        <div className='row formRow'>
                            <div className='col'>
                                <Multiselect 
                                    name='messageField'
                                    showArrow options={messageField} 
                                    isObject={false} />
                            </div>
                        </div>
                        </>
                    )}       

                <button className='submit-btn' disabled={disabled} type='submit'>
                  Submit
                </button>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
  );
};

export default ContactForm;
