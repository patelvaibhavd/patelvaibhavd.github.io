// Add your javascript here
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
document.getElementById("dob-value").append(getAge("1994/08/29"));

function scrollToTargetAdjusted(targetElement){
  var element = document.getElementById(targetElement);
  var headerOffset = 100;
  if(window.innerWidth < 767) {
    headerOffset = 160;
  } 
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
       top: offsetPosition,
       behavior: "smooth"
  });
}