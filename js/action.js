const toField = document.getElementById("to_email_address");
	const ccField = document.getElementById("cc_email_address");
    const subjectField = document.getElementById("email_subject");
    const bodyField = document.getElementById("email_message");
    const emailLink = document.getElementById("email_link");
    const emailClipboard = document.getElementById("email_clipboard");
    
	<!-- Email lists for templates -->
	const CECList = "glloyd@collegeemployercouncil.ca";
    const ONGovList = "premier@ontario.ca, doug.fordco@pc.ola.org, minister.edu@ontario.ca";
	const ONCollegesList = "president@algonquincollege.com, daniel.giroux@collegeboreal.ca, president@cambriancollege.ca, george.burton@canadorecollege.ca, cstephenson@centennialcollege.ca, jtibbits@conestoga.on.ca, michelle.salo@confederationcollege.ca, elaine.popp@durhamcollege.ca, pdevlin@fanshawec.ca, president@flemingcollege.ca, president@georgebrown.ca, president@georgiancollege.ca, annmarie.vaughan@humber.ca, president@lacitec.on.ca, rob.kardas@lambtoncollege.ca, mkirkpatrick@loyalistcollege.com, president@mohawkcollege.ca, skennedy@niagaracollege.ca, dumasm@northern.on.ca, president@saultcollege.ca, david.agnew@senecacollege.ca, rajan.sandhu@sheridancollege.ca, msilvaggi@stclaircollege.ca, gvollebregt@sl.on.ca";
	const ONMPPsList = "jburch-qp@ndp.on.ca, jstevens-qp@ndp.on.ca, wgates-qp@ndp.on.ca";

	function PopulateTemplateDefault() {
		toField.value = ONCollegesList;
		ccField.value = CECList + ", " + ONGovList;
		subjectField.value = "I support striking workers";
		bodyField.value = "Dear College Presidents,\n\nAs someone personally impacted by the ongoing strike, I urge you to get full-time college support staff back to work with a deal that protects jobs and student supports.\n\nCollege support staff are essential to the student experience in every realm: from accessible learning to financial aid, from maintenance and repair to employment services, and so much more. Students are feeling the impact of not having access to support staff they rely on – our campuses just don’t work without them.\n\nAfter 600 program cuts across Ontario, we can’t afford any more cuts to student resources – which include frontline staff.\n\nYou can help end this strike today with a deal that offers real job protections. I am asking you to fulfill that responsibility.\n\nSincerely,\nConcerned Student";
		document.getElementById("info").scrollIntoView({ behavior: 'smooth' });
		
		//Update Link
		updateEmailTemplateLink();
	};
	
	function PopulateTemplate1() {
		toField.value = ONCollegesList;
		ccField.value = CECList + ", " + ONGovList;;
		subjectField.value = "Fair Treatment for College Support Staff";
		bodyField.value = "Dear College Presidents,\n\nI'm writing to express my disappointment with how the college support staff are being treated. I hope you will use your position to advocate for a fair agreement and a quick resolution to this dispute.\n\nSincerely,\nConcerned Student";
				
		//Update Link
		updateEmailTemplateLink();
	};
	
	function PopulateTemplate2() {
		toField.value = ONCollegesList;
		ccField.value = CECList + ", " + ONGovList; 
		subjectField.value = "Urgent Appeal to Return to Bargaining - Student Concerns About Education";
		bodyField.value = "Dear College Presidents,\n\nI am writing to you as a concerned student currently enrolled at one of Ontario's publicly funded colleges. As the support staff strike continues, I am deeply worried about the impact this prolonged disruption is having on my education and that of my fellow students across the province.\n\nI understand that you, as college presidents, have significant influence over the College Employer Council and its negotiating stance. While I respect the collective bargaining process, I am troubled by reports that negotiations have reached a standstill, with no talks currently scheduled between the CEC and OPSEU.\n\nThe effects of this strike are already being felt in classrooms, labs, and essential student services. Many of us are experiencing:\n\nDelayed lab sessions that depend on support staff technologists\nDisrupted access to academic advising and accommodation services\nUncertainty about graduation timelines and credential processing\nReduced access to financial aid offices during a critical time\n\nAs students, we have invested significantly in our education—both financially and in terms of our future career prospects. Many of us are concerned about potential delays to program completion and the cascading effects this may have on our post-graduation plans.\n\nI implore you to use your collective influence to encourage the CEC to return to the bargaining table with a renewed commitment to reaching a fair and sustainable agreement. While I understand the financial challenges facing colleges, I believe that continued dialogue—rather than waiting for arbitration—offers the best path forward for all stakeholders.\n\nOur education should not be held hostage to a bargaining impasse. I respectfully urge you to prioritize student welfare and work toward a resolution that gets our dedicated support staff back to work and allows us to focus on our studies without further disruption.\n\nThank you for your time and consideration. I look forward to seeing swift action to resolve this situation.\n\nSincerely,\nConcerned Student";
		document.getElementById("info").scrollIntoView({ behavior: 'smooth' });
		
		//Update Link
		updateEmailTemplateLink();
	};
	
	function PopulateTemplate3() {
		toField.value = CECList;
		ccField.value = ONCollegesList + ", " + ONGovList; 
		subjectField.value = "Strengthening Public Colleges Through Redirected Funding";
		bodyField.value = "Dear Mr. Lloyd and CEC Negotiating Team,\n\nPublic Ontario colleges are vital both to students like me and to communities across the province. From Timmins to Windsor, these institutions deliver accessible, high-quality education that fuels local economies and supports diverse learners.\n\nI am concerned by the recent shift of public skills training dollars toward private providers—especially concentrated in the GTA. This trend undermines our public colleges, which already face funding shortfalls worsened by the ongoing support staff strike.\n\nI respectfully urge the CEC to advocate for redirecting these public training funds back to Ontario’s publicly funded colleges. By doing so, you would reinforce the strength of the public system, ensure training is equitably available throughout the province, and support the dedicated faculty and staff who serve our communities.\n\nThank you for your leadership and commitment to Ontario’s learners. I trust you will champion funding priorities that sustain and enhance our public colleges.\n\nSincerely,\nConcerned Student\n";
		document.getElementById("info").scrollIntoView({ behavior: 'smooth' });
		
		//Update Links
		PopulateTemplateDefault();
		updateEmailTemplateLink();
	};
	
	function PopulateTemplate4() {
		toField.value = CECList;
		ccField.value = "";
		subjectField.value = "Student Appeal - Return to Bargaining Table";
		bodyField.value = "";
		document.getElementById("info").scrollIntoView({ behavior: 'smooth' });
		
		//Update Link
		updateEmailTemplateLink();
	};

	function updateEmailTemplateLink() {
      const to = encodeURIComponent(toField.value);
	  const cc = encodeURIComponent(ccField.value);
      const subject = encodeURIComponent(subjectField.value);
      const body = encodeURIComponent(bodyField.value);
	  const message = to + "?cc=" + cc + "&subject=" + subject +"&body=" + body;
	  emailLink.setAttribute('href', 'mailto:' + message);
    }

	async function GenerateClipboardTemplateLink() {

		// Select the text in the textarea
		bodyField.select();
		bodyField.setSelectionRange(0, 99999); // For mobile devices
		
		// Copy the text to the clipboard
		document.execCommand("copy");
		
		//Provide feedback
		alert("Message copied to clipboard.");
	}

    // Update link whenever fields change
    subjectField.addEventListener("input", updateEmailTemplateLink);
    bodyField.addEventListener("input", updateEmailTemplateLink);
	emailClipboard.addEventListener("click", GenerateClipboardTemplateLink);
	
    // Initialize link
	PopulateTemplateDefault();
    updateEmailTemplateLink();